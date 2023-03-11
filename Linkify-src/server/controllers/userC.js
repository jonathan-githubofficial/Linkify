//Author:  Jonathan Haddad 40111053
//Date:  2023-02-22
//Description:  

const jwt = require('jsonwebtoken') // for creating tokens
const bcrypt = require('bcryptjs') // for hashing passwords
const userM = require("../models/userM.js");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
  // const email = req.query.email;
  // const password = req.query.password;
  const {email, password} = req.query;

  const user = await userM.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      department: user.department,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }


const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userM.find({});
  if (users) {
    res.json(users);
  } else {
    res.status(401);
    throw new Error("Users not found");
  }
});

// Hash password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

 // Create user
 const user = await User.create({
  name,
  email,
  password: hashedPassword,
})

if (user) {
  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  })
} else {
  res.status(400)
  throw new Error('Invalid user data')
}
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const getUserDetailsById = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const user = await userM.findById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const getUserByMail = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const user = await userM.findOne({ email });
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, name, email, password, isAdmin } = req.query;
  const user = await userM.findById(id);
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
  const { id, oldPassword, newPassword } = req.query;
  const user = await userM.findById(id);
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
  const user = await userM.findById(id);
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
  const user = await userM.findById(id);
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

const getTest = asyncHandler(async (req, res) => {
  res.json({ message: " TAMAM w 1/2 " });
}  );

module.exports = {
  login,
  registerUser,
  getAllUsers,
  getUserDetailsById,
  getUserByMail,
  updateUser,
  deleteUser,
  updatePassword,
  addProfileImage,
  getTest,
};