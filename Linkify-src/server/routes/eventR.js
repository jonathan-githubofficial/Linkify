const express = require('express');
const eventController = require('../controllers/eventC');

const router = express.Router();

// @desc Get all events
// @route GET /api/events/getAllEvents)
// @access Public
router.get('/getAllEvents', eventController.getAllEvents);

// @desc Create a new event
// @route POST /api/events/createEvent
// @access Private
router.post('/createEvent', eventController.createEvent);

// @desc Get an event by id
// @route GET /api/events/getEventById
// @access Private
router.get('/getEventById', eventController.getEventById);

// @desc Update an event
// @route PUT /api/events/:id
// @access Private
router.put('/updateEvent', eventController.updateEvent);

// @desc Delete an event
// @route DELETE /api/events/:id
// @access Private
router.delete('/deleteEvent', eventController.deleteEvent);

module.exports = router;
