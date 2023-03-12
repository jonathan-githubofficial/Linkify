const express = require("express");
const userPropertyC = require("../controllers/userPropertiesC.js");

const router = express.Router();

router.post("/addSkill", userPropertyC.addSkill);
router.delete("/deleteSkill", userPropertyC.deleteSkill);
router.post("/addLanguage", userPropertyC.addLanguage);
router.delete("/deleteLanguage", userPropertyC.deleteLanguage);

router.delete("/deleteProject", userPropertyC.deleteProject);

// @desc Adding a project
// @route POST /api/user/property/addProject
// @access Public
router.post("/addProject", userPropertyC.addProject);

// @desc Add new experience to user profile
// @route POST /api/user/property/addExperience
// @access Public
router.post("/addExperience", userPropertyC.editExperience);

router.delete("/deleteExperience", userPropertyC.deleteExperience);
router.post("/addEducation", userPropertyC.addEducation);
router.delete("/deleteEducation", userPropertyC.deleteEducation);
router.post("/addLocation", userPropertyC.addLocation);

// @desc Edit an existing education from user profile
// @route PUT /api/user/property/editEducation
// @access Public
// router.put("/editEducation", userPropertyC.editEducation);

module.exports = router;
