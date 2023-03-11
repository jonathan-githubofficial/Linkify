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

/**
 * @desc Delete all messages between two users
 * @route DELETE /api/messages/deletemessages
 * @access Public
 */
router.delete('/deletemessages', messagesController.deleteMessages);

/**
 * @desc Delete a single message by ID
 * @route DELETE /api/messages/deletemessage/:id
 * @access Public
 */
router.delete('/deletemessage/:id', messagesController.deleteMessageById);


/**
 * @desc Get all users who have a conversation with each other
 * @route GET /api/messages/getuserswithconversation
 * @access Public
 */
router.get('/getuserswithconversation', messagesController.getUsersWithConversation);


/**
* @desc Get all users who are messaging with a specific user
* @route GET /api/messages/usersmessagingwithuser/:userId
* @access Public
*/
router.get('/usersmessagingwithuser/:userId', messagesController.getUsersMessagingWithUser);


module.exports = router;
