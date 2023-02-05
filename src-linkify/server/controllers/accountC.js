const accountM = require("../models/accountM.js");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await accountM.findOne({ email });
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
  const user = await accountM.findOne({ email: req.body.email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const { name, email, password } = req.body;
    const newUser = await accountM.create({
      name,
      email,
      password,
    });
    if (newUser) {
      res.json(newUser);
    } else {
      res.status(401);
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
  const { email } = req.body;
  const user = await accountM.findOne({ email });
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, name, email, password, isAdmin } = req.body;
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
      res.json(updatedUser);
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
    user.profilePic = req.imageURL;
    const updatedUser = await user.save();
    res.json(updatedUser);
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
};
