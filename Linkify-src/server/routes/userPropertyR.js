const express = require("express");
const userPropertyC = require("../controllers/userPropertiesC.js");

const router = express.Router();

router.post("/addSkill", userPropertyC.addSkill);
router.delete("/deleteSkill", userPropertyC.deleteSkill);
router.post("/addLanguage", userPropertyC.addLanguage);
router.delete("/deleteLanguage", userPropertyC.deleteLanguage);
router.put("/addExperience", userPropertyC.editExperience);
router.post("/addEducation", userPropertyC.addEducation);
router.delete("/deleteEducation", userPropertyC.deleteEducation);
router.post("/addLocation", userPropertyC.addLocation);

module.exports = router;