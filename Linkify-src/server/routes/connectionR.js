const express = require("express");
const connectionC = require("../controllers/connectionC.js");

const router = express.Router();

router.post("/sendConnectionRequest", connectionC.sendConnectionRequest);
router.post("/acceptConnectionRequest", connectionC.acceptConnectionRequest);
router.post("/rejectConnectionRequest", connectionC.rejectConnectionRequest);
router.post("/removeConnection", connectionC.removeConnection);

module.exports = router;