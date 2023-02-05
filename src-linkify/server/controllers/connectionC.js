const asyncHandler = require("express-async-handler");
const accountM = require("../models/accountM.js");

const sendConnectionRequest = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body;
  const user = await accountM.findById(receiverId);
  if (user) {
    user.connectionRequests.push(senderId);
    await user.save();
    res.json("Connection request sent successfully");
  } else {
    res.status(401);
    throw new Error("Recepient not found");
  }
});

const acceptConnectionRequest = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body;
  const user = await accountM.findById(receiverId);
  const sender = await accountM.findById(senderId);
  if (user) {
    user.connectionRequests = user.connectionRequests.filter(
      (item) => item.toString() !== senderId
    );
    user.connections.push(senderId);
    sender.connections.push(receiverId);
    await user.save();
    await sender.save();
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
      (item) => item.toString() !== senderId
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
  const connection = await accountM.findById(connectionId);
  if (user) {
    user.connections = user.connections.filter(
      (item) => item.toString() !== connectionId
    );
    connection.connections = connection.connections.filter(
      (item) => item.toString() !== userId
    );
    await user.save();
    await connection.save();
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
