// this controller is used to manage user attributes like: skills, languages, experience, education, location
const accountM = require("../models/accountM");
const asyncHandler = require("express-async-handler");

// add skill
const addSkill = asyncHandler(async (req, res) => {
  const { id, skill } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.skills.push(skill);
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// delete skill
const deleteSkill = asyncHandler(async (req, res) => {
  const { id, skill } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.skills = user.skills.filter((item) => item !== skill);
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// add language
const addLanguage = asyncHandler(async (req, res) => {
  const { id, language } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.languages.push(language);
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// delete language
const deleteLanguage = asyncHandler(async (req, res) => {
  const { id, language } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.languages = user.languages.filter((item) => item !== language);
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// add experience
const editExperience = asyncHandler(async (req, res) => {
  const { id, experience } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.experience = experience;
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// add education
const addEducation = asyncHandler(async (req, res) => {
  const { id, education } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.education.push = education;
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// delete education
const deleteEducation = asyncHandler(async (req, res) => {
  const { id, education } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.education = user.education.filter((item) => item !== education);
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// add location
const addLocation = asyncHandler(async (req, res) => {
  const { id, location } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.location = location;
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

module.exports = {
  addSkill,
  deleteSkill,
  addLanguage,
  deleteLanguage,
  editExperience,
  addEducation,
  deleteEducation,
  addLocation,
};
