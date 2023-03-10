const asyncHandler = require("express-async-handler");
const userM = require("../models/userM.js");

const sendConnectionRequest = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body;
  const user = await userM.findById(receiverId);
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
  const user = await userM.findById(receiverId);
  const sender = await userM.findById(senderId);
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
  const user = await userM.findById(receiverId);
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
  const user = await userM.findById(userId);
  const connection = await userM.findById(connectionId);
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