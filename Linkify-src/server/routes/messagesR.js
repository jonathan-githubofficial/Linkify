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
* @desc Get all messages for a receiver
* @route GET /api/messages/receiver
* @routedetails Get /api/messages/receiver?receiver=<receiver-id>
* @access Public
*/
router.get('/receiver', messagesController.getMessagesForReceiver);

module.exports = router;
