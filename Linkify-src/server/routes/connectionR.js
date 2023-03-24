const express = require("express");
const connectionController = require("../controllers/connectionC.js");

const router = express.Router();

/**
 * @desc Send a connection request to another user
 * @route POST /user/connection/sendConnectionRequest
 * @access Private
 */
router.post(
  "/sendConnectionRequest",
  connectionController.sendConnectionRequest
);

/**
 * @desc Accept a connection request from another user
 * @route POST /user/connection/acceptConnectionRequest
 * @access Private
 */
router.post(
  "/acceptConnectionRequest",
  connectionController.acceptConnectionRequest
);

/**
 * @desc Reject a connection request from another user
 * @route POST /user/connection/rejectConnectionRequest
 * @access Private
 */
router.post(
  "/rejectConnectionRequest",
  connectionController.rejectConnectionRequest
);

/**
 * @desc Remove a connection to another user
 * @route POST /user/connection/removeConnection
 * @access Private
 */
router.post("/removeConnection", connectionController.removeConnection);

/**
 * @desc Get all connection requests for a user
 * @route GET /user/connection/getConnectionRequests
 */
router.get(
  "/getConnectionRequests",
  connectionController.getConnectionRequests
);

module.exports = router;
