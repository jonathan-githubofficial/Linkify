const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');
const upload = require("../middleware/multerMessages");


/**
 * @desc Post a new message
 * @route POST /api/messages/postmessage
 * @access Public
 */
router.post('/postmessage', upload.single("file"), messagesController.postMessage);


/**
 * @desc Get all messages between two users
 * @route GET /api/messages/getmessage
 * @access Public
 */
router.get('/getmessage', messagesController.getMessages);

/**
 * @desc Delete all messages between two users
 * @route PUT /api/messages/deletemessages
 * @access Public
 */
router.put('/deletemessages', messagesController.deleteMessages);

/**
 * @desc Delete a single message by ID
 * @route PUT /api/messages/deletemessage/:id
 * @access Public
 */
router.put('/deletemessage/:id', messagesController.deleteMessageById);


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


/**
 * @desc Report a message
 * @route PUT /api/messages/report/:messageId
 * @access Public
 */
router.put('/report/:messageId', messagesController.reportDM);


/**
 * @desc Delete a message by sender (if the sender deleted their message)
 * @route PUT /api/messages/deleteBySender/:id
 * @access Public
 */
router.put('/deleteBySender/:id', messagesController.deleteMessageBySender);

/**
 * @desc Hide a message from receiver's view
 * @route PUT /api/messages/hideFromReceiver/:id
 * @access Public
 */
router.put('/hideFromReceiver/:id', messagesController.hideMessageFromReceiver);

/**
 * @desc Hide chat for a specific user
 * @route PUT /api/messages/hideChatForUser
 * @access Public
 */
router.put('/hideChatForUser', messagesController.hideChatForUser);


module.exports = router;
