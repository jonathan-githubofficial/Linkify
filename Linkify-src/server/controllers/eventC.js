// events controller
// Author: Jonathan Haddad
// Date created: Mar 16, 2023
// Description: This file contains the methods for handling the various event related HTTP requests. These include getting all events, creating a new event, getting a specific event by ID, updating an event, and deleting an event.

const Event = require('../models/eventM');
const asyncHandler = require('express-async-handler');

// Get all events
const getAllEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new event
const createEvent = asyncHandler(async (req, res) => {
  try {
    const { name, description, date, location, attendees } = req.body;
    const newEvent = await Event.create({ name, description, date, location, attendees });
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific event by id
const getEventById = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an event
const updateEvent = asyncHandler(async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an event
const deleteEvent = asyncHandler(async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};
