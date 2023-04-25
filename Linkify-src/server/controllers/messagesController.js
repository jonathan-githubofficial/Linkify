// messages controller
// Author: Jonathan Haddad
// Date created: Mar 5, 2023

/* Description: This file contains the methods for handling the various message related HTTP requests.
 These include creating a new message, getting all messages between two users, 
 deleting all messages between two users, deleting a single message by ID, 
 getting all users who have a conversation with each other, and getting all messages sent to a specific receiver.*/

const Account = require("../models/accountModel");
const Message = require("../models/messagesModel");
const asyncHandler = require("express-async-handler");

// Create a new message
const postMessage = async (req, res) => {
  try {
    const { sender, receiver, message, time } = req.body;
    const newMessage = new Message({ sender, receiver, message, time });

    // Add the file to the attachments field
    if (req.file) {
      newMessage.attachments.push({
        fileName: req.file.originalname,
        filePath: req.file.path,
      });
    }

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete all messages between two users
const deleteMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    await Message.updateMany(
      {
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender },
        ],
      },
      { isDeleted: true }
    );
    res.status(200).json({ message: "All messages deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Delete a single message by ID
const deleteMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    message.isDeleted = true;
    await message.save();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all users who have a conversation with each other
const getUsersWithConversation = async (req, res) => {
  try {
    const conversations = await Message.distinct("sender", {
      receiver: { $ne: null },
    });
    let users = [];
    conversations.forEach((conversation) => {
      const [user1, user2] = conversation.split(",");
      if (!users.includes(user1)) {
        users.push(user1);
      }
      if (!users.includes(user2)) {
        users.push(user2);
      }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all messages sent to a specific receiver and messages sent by the receiver
const getMessagesForReceiver = async (req, res) => {
  try {
    const receiverId = req.query.receiver;

    const messages = await Message.find({
      $or: [{ receiver: receiverId }, { sender: receiverId }],
    }).sort({ time: 1 });

    const usersInConversation = {};

    for (const message of messages) {
      // Filter out deleted messages
      if (message.isDeleted) continue;

      if (message.sender === receiverId) {
        if (!usersInConversation[message.receiver]) {
          const user = await Account.findById(message.receiver);
          usersInConversation[message.receiver] = {
            name: user.name,
            messages: [],
          };
        }
        usersInConversation[message.receiver].messages.push(message.message);
      } else {
        if (!usersInConversation[message.sender]) {
          const user = await Account.findById(message.sender);
          usersInConversation[message.sender] = {
            name: user.name,
            messages: [],
          };
        }
        usersInConversation[message.sender].messages.push(message.message);
      }
    }

    res.status(200).json(usersInConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Report a message
const reportDM = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { reportType } = req.body;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.reportType = reportType;
    const updatedMessage = await message.save();

    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const deleteMessageBySender = async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.isDeleted = true;
    await message.save();
    res.status(200).json({ message: "Message deleted by sender successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const hideMessageFromReceiver = async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.hidden = true;
    await message.save();
    res.status(200).json({ message: "Message hidden from receiver successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hide a conversation for a user
const hideChatForUser = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    // Update messages sent by the sender to have hiddenForSender set to true
    await Message.updateMany({ sender: sender, receiver: receiver }, { hiddenForSender: true });

    // Update messages received by the sender to have hidden set to true
    await Message.updateMany({ sender: receiver, receiver: sender }, { hidden: true });

    res.status(200).json({ message: "Conversation hidden successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all messages between two users
const getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.query;

    const messages = await Message.find({
      $or: [
        {
          sender: sender,
          receiver: receiver,
        },
        {
          sender: receiver,
          receiver: sender,
        },
      ],
    }).sort({ time: 1 });

    // Filter out deleted messages and hidden messages for the specific sender
    const filteredMessages = messages.filter((message) => {
      if (message.isDeleted) return false;

      if (message.sender.toString() === sender && message.hiddenForSender) {
        return false;
      }

      if (message.receiver.toString() === sender && message.hidden) {
        return false;
      }

      return true;
    });

    res.status(200).json(filteredMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  postMessage,
  deleteMessages,
  deleteMessageById,
  getUsersWithConversation,
  getMessagesForReceiver,
  reportDM,
  deleteMessageBySender,
  hideMessageFromReceiver,
  hideChatForUser,
  getMessages,
};

