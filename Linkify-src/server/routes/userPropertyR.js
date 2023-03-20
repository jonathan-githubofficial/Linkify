const express = require("express");
const router = express.Router();
const userPropertyController = require("../controllers/userPropertiesC.js");

// @desc Add a new skill to user profile
// @route POST /api/user/property/addSkill
// @access Public
router.post("/addSkill", userPropertyController.addSkill);

// @desc Delete an existing skill from user profile
// @route DELETE /api/user/property/deleteSkill
// @access Public
router.delete("/deleteSkill", userPropertyController.deleteSkill);

// @desc Add a new language to user profile
// @route POST /api/user/property/addLanguage
// @access Public
router.post("/addLanguage", userPropertyController.addLanguage);

// @desc Delete an existing language from user profile
// @route DELETE /api/user/property/deleteLanguage
// @access Public
router.delete("/deleteLanguage", userPropertyController.deleteLanguage);

// @desc Add new experience to user profile
// @route POST /api/user/property/addExperience
// @access Public
router.post("/addExperience", userPropertyController.editExperience);

// @desc Add new education to user profile
// @route POST /api/user/property/addEducation
// @access Public
router.post("/addEducation", userPropertyController.addEducation);

// @desc Delete an existing education from user profile
// @route DELETE /api/user/property/deleteEducation
// @access Public
router.delete("/deleteEducation", userPropertyController.deleteEducation);

// @desc Add user location to user profile
// @route POST /api/user/property/addLocation
// @access Public
router.post("/addLocation", userPropertyController.addLocation);

// @desc Edit an existing education from user profile
// @route PUT /api/user/property/editEducation
// @access Public
router.put("/editEducation", userPropertyController.editEducation);

// @desc Delete an existing education from user profile
// @route DELETE /api/user/property/deleteEducation
// @access Public
router.delete("/deleteEducation", userPropertyController.deleteEducation);

// @desc Add a new project to user profile
// @route POST /api/user/property/addProject
// @access Public
router.post("/addProject", userPropertyController.addProject);

// @desc Delete an existing project from user profile
// @route DELETE /api/user/property/deleteProject
// @access Public
router.delete("/deleteProject", userPropertyController.deleteProject);


module.exports = router;
