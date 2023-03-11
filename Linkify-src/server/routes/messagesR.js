

const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesC');

/**
 * @desc Create a new message
 * @route POST /api/messages/postmessage
 * @access Public
 */
router.post('/postmessage', messagesController.createMessage);

/**
 * @desc Get all messages between two users
 * @route GET /api/messages/getmessage
 * @access Public
 */
router.get('/getmessage', messagesController.getMessages);

module.exports = router;
