// group controller
// Author: Jonathan Haddad
// Date created: Mar 16, 2023

/* Description: This file contains the methods for handling the various group related HTTP requests. 
These include getting all groups, creating a new group, 
getting a specific group by ID, updating a group, and deleting a group.*/

const Group = require('../models/groupM');
const asyncHandler = require('express-async-handler');

// Get all groups
const getAllGroups = asyncHandler(async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new group
const createGroup = asyncHandler(async (req, res) => {
  try {
    const { name, description, members, status } = req.body;
    const newGroup = await Group.create({ name, description, members, status });
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific group by id
const getGroupById = asyncHandler(async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a group
const updateGroup = asyncHandler(async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedGroup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a group
const deleteGroup = asyncHandler(async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Group deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllGroups,
  createGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
};
