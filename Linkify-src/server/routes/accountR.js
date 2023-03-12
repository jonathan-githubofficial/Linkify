const express = require("express");
const accountC = require("../controllers/accountC.js");

const router = express.Router();

/**
 * @desc Register a new user
 * @route POST /api/account/register
 * @access Public
 */
router.post("/register", accountC.registerUser);

/**
 * @desc Authenticate user
 * @route POST /api/account/login
 * @access Public
 */
router.post("/login", accountC.login);

/**
 * @desc Get all users
 * @route GET /api/account/users
 * @access Public
 */
router.get("/users", accountC.getAllUsers);

/**
 * @desc Get user details by ID
 * @route GET /api/account/:id
 * @access Public
 */
router.get("/:id", accountC.getUserDetailsById);

/**
 * @desc Get user details by email
 * @route GET /api/account/email/:email
 * @access Public
 */
router.get("/email/:email", accountC.getUserByMail);

/**
 * @desc Update user details by ID
 * @route PUT /api/account/updateUser/:id
 * @access Public
 */
router.put("/updateUser/:id", accountC.updateUser);

/**
 * @desc Update user password by ID
 * @route PUT /api/account/password/:id
 * @access Public
 */
router.put("/password/:id", accountC.updatePassword);

/**
 * @desc Add profile image for user
 * @route POST /api/account/profile-image/:id
 * @access Public
 */
router.post("/profile-image/:id", accountC.addProfileImage);

/**
 * @desc Delete user by ID
 * @route DELETE /api/account/:id
 * @access Public
 */
router.delete("/:id", accountC.deleteUser);

module.exports = router;
