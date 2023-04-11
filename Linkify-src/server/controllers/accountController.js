// account controller
// Author: Jonathan Haddad - Saad Hanna
// Date created: Feb 20, 2023

/* Description: This file contains the methods for handling the various account related HTTP requests.
 These include user registration, authentication, getting all users, getting user details by id or email,
  updating user details and password, adding a profile image, deleting a user, matching current password, and updating the user profile.*/

const accountM = require("../models/accountModel.js");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const passport = require("passport");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await accountM.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isRecruiter} = req.body;

  // Convert the email to lowercase before checking for duplicates
  const existingUser = await accountM.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    // Password validation
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordValidation.test(password)) {
      res.status(400);
      throw new Error("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol.");
    }

    // Store the email in lowercase when creating a new user
    const newUser = await accountM.create({
      name,
      email: email.toLowerCase(),
      password,
      isRecruiter,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        isRecruiter: newUser.isRecruiter,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});



const getAllUsers = asyncHandler(async (req, res) => {
  const users = await accountM.find({});
  if (users) {
    res.json(users);
  } else {
    res.status(401);
    throw new Error("Users not found");
  }
});



const getUserDetailsById = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const user = await accountM.findById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const getUserByMail = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const user = await accountM.findOne({ email });
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const updateUser = asyncHandler(async (req, res) => {
  const { id, name, email, password, isAdmin } = req.query;
  const user = await accountM.findById(id);
  if (user) {
    user.name = name;
    user.email = email;
    user.password = password;
    user.isAdmin = isAdmin;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const updatePassword = asyncHandler(async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    if (await user.matchPassword(oldPassword)) {
      user.password = newPassword;
      const updatedUser = await user.save();
      res.json({
        message: "Password updated successfully",
        id: updatedUser._id,
      });
    } else {
      res.status(401);
      throw new Error("Old password is incorrect");
    }
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const addProfileImage = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const user = await accountM.findById(id);
  if (user) {
    user.profilePic = req.body.imageURL;
    const updatedUser = await user.save();
    res.json({
      message: "Profile image updated successfully",
      profilePic: updatedUser.profilePic,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const user = await accountM.findById(id);
  console.log(user);
  if (user) {
    user.deleteOne();
    res.status(200);
    res.json({ message: "User deleted" });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const matchCurrentPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await accountM.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      message: 'true'
    })
  } else {
    res.json({
      message: 'false'
    })
  }
});



const updateProfile = asyncHandler(async (req, res) => {
  const { id, name, email } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.name = name;
    user.email = email;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const searchUsers = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const users = await accountM.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        // { email: { $regex: searchQuery, $options: 'i' } },
      ],
    });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await accountM.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  // Generate a reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  console.log('Generated token:', resetToken);
  console.log('User email:', email);
  // Set the reset token and its expiration time
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();
  
  // Create a transporter using Outlook and your credentials
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.OUTLOOK_USER,
      pass: process.env.OUTLOOK_PASS,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  // Set up the email content
  const mailOptions = {
    from: process.env.OUTLOOK_USER,
    to: email,
    subject: "Password Reset",
    text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste it into your browser to complete the process:\n\nhttp://localhost:3000/reset-password/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    } else {
      res.status(200).json({ message: "Password reset email sent" });
    }
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  console.log({ token, newPassword });
  const user = await accountM.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  console.log('Found user:', user);
  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update the password
  user.password = hashedPassword;
  // Clear the token and expiration time
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
});



// Google login
const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google callback
const googleCallback = async (req, res) => {
  // At this point, the user should be authenticated through Google and the user object should be attached to req.user
  const { _id, name, email, isAdmin } = req.user;

  // we can generate a token here, store it in a cookie, or use any other method to keep the user logged in on the frontend.

  // Redirect the user to the frontend homepage
  res.redirect("http://localhost:3000/");
};



module.exports = {
  login,
  registerUser,
  getAllUsers,
  getUserDetailsById,
  getUserByMail,
  updateUser,
  deleteUser,
  addProfileImage,
  updateProfile,
  matchCurrentPassword,
  searchUsers,
  updatePassword,
  forgotPassword,
  resetPassword,
  googleLogin,
  googleCallback,
};
