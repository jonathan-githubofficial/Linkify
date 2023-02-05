const express = require("express");
const cvController = require("../controllers/CVcoverLetterC.js");

const router = express.Router();

router.post("/addCoverLetter", cvController.addCoverLetter);
router.delete("/deleteCoverLetter", cvController.deleteCoverLetter);
router.post("/addResume", cvController.addResume);
router.delete("/deleteResume", cvController.deleteResume);

module.exports = router;
