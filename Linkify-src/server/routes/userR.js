const express = require("express");
const router = express.Router();
const userC = require("../controllers/userC.js");
const { protect } = require('../middleware/authMiddleware')

router.post("/register", userC.registerUser);
router.post("/login", userC.login);
router.get("/users", userC.getAllUsers);
router.get("/getUser", userC.getUserDetailsById);
router.get("/userByMail", userC.getUserByMail);
router.put("/updateUser", userC.updateUser);
router.put("/updatePassword", userC.updatePassword);
router.post("/addProfileImage", userC.addProfileImage);
router.delete("/deleteUser", userC.deleteUser);
router.get("/test", userC.getTest);

module.exports = router;