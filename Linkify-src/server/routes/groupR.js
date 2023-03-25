const express = require('express');
const groupController = require('../controllers/groupC');

const router = express.Router();

// @desc Get all groups
// @route GET /api/groups/getAllGroups
// @access Public
router.get('/getAllGroups', groupController.getAllGroups);

// @desc Add a new group
// @route POST /api/groups/createGroup
// @access Public
router.post('/createGroup', groupController.createGroup);

// @desc Get a specific group by id
// @route GET /api/groups/getGroupById/:id
// @access Public
router.get('/getGroupById', groupController.getGroupById);

// @desc Update a group
// @route PATCH /api/groups/updateGroup/:id
// @access Public
router.patch('/updateGroup', groupController.updateGroup);

// @desc Delete a group
// @route DELETE /api/groups/deleteGroup/:id
// @access Public
router.delete('/deleteGroup', groupController.deleteGroup);

module.exports = router;
