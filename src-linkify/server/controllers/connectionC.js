const asyncHandler = require("express-async-handler");
const accountM = require("../models/accountM.js");

const sendConnectionRequest = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body;
  const user = await accountM.findById(receiverId);
  if (user) {
    user.connectionRequests.push(senderId);
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("Recepient not found");
  }
});

const acceptConnectionRequest = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body;
  const user = await accountM.findById(receiverId);
  if (user) {
    user.connectionRequests = user.connectionRequests.filter(
      (item) => item !== senderId
    );
    user.connections.push(senderId);
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("Recepient not found");
  }
});

const rejectConnectionRequest = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body;
  const user = await accountM.findById(receiverId);
  if (user) {
    user.connectionRequests = user.connectionRequests.filter(
      (item) => item !== senderId
    );
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("Recepient not found");
  }
});

const removeConnection = asyncHandler(async (req, res) => {
  const { userId, connectionId } = req.body;
  const user = await accountM.findById(userId);
  if (user) {
    user.connections = user.connections.filter((item) => item !== connectionId);
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

module.exports = {
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  removeConnection,
};
