const express = require("express");
const userPropertyC = require("../controllers/userPropertiesC.js");

const router = express.Router();

router.post("addSkill", userPropertyC.addSkill);
router.post("deleteSkill", userPropertyC.deleteSkill);
router.post("addLanguage", userPropertyC.addLanguage);
router.post("deleteLanguage", userPropertyC.deleteLanguage);
router.put("addExperience", userPropertyC.editExperience);
router.post("addEducation", userPropertyC.addEducation);
router.post("deleteEducation", userPropertyC.deleteEducation);
router.post("addLocation", userPropertyC.addLocation);

module.exports = router;
