
const express = require("express");
const accountC = require("../controllers/accountC.js");

const router = express.Router();

router.post("/register", accountC.registerUser);
router.post("/login", accountC.login);
router.get("/users", accountC.getAllUsers);
router.get("/getUser", accountC.getUserDetailsById);
router.get("/userByMail", accountC.getUserByMail);
router.put("/updateUser", accountC.updateUser);
router.put("/updatePassword", accountC.updatePassword);
router.post("/addProfileImage", accountC.addProfileImage);
router.delete("/deleteUser", accountC.deleteUser);

module.exports = router;