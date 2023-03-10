
const accountM = require("../models/accountM");
const asyncHandler = require("express-async-handler");

// Function to add a skill to the user's skills list
const addSkill = asyncHandler(async (req, res) => {
  // Destructure the id and skill from the request body
  const { id, skill } = req.body;
  // Find the user with the given id
  const user = await accountM.findById(id);
  // If the user is found
  if (user) {
    // Add the skill to the user's skills list
    user.skills.push(skill);
    // Save the user
    await user.save();
    // Respond with a success message and the updated user's skills list
    res.json({
      message: "Skill added successfully",
      userSkillList: user.skills,
    });
  } else {
    // If the user is not found, respond with a 401 status and an error message
    res.status(401);
    throw new Error("User not found");
  }
});

// Function to delete a skill from the user's skills list
const deleteSkill = asyncHandler(async (req, res) => {
  // Destructure the id and skill from the request body
  const { id, skill } = req.query;
  // Find the user with the given id
  const user = await accountM.findById(id);
  // If the user is found
  if (user) {
    // Filter the user's skills list to exclude the given skill
    user.skills = user.skills.filter((item) => item !== skill);
    // Save the user
    await user.save();
    // Respond with a success message and the updated user's skills list
    res.json({
      message: "Skill deleted successfully",
      userSkillList: user.skills,
    });
  } else {
    // If the user is not found, respond with a 401 status and an error message
    res.status(401);
    throw new Error("User not found");
  }
});

// Function to add a language to the user's languages list
const addLanguage = asyncHandler(async (req, res) => {
  // Destructure the id and language from the request body
  const { id, language } = req.body;
  // Find the user with the given id
  const user = await accountM.findById(id);
  // If the user is found
  if (user) {
    // Add the language to the user's languages list
    user.languages.push(language);
    // Save the user
    await user.save();
    // Respond with a success message and the updated user's languages list
    res.json({
      message: "Language added successfully",
      userLanguageList: user.languages,
    });
  } else {
    // If the user is not found, respond with a 401 status and an error message
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
    res.json({
      message: "Language deleted successfully",
      userLanguageList: user.languages,
    });
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
    // user.experience = experience;
    user.experience.push(experience);
    await user.save();
    res.json({
      message: "Experience added successfully",
      userExperience: user.experience,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});


// add education
const addEducation = asyncHandler(async (req, res) => {
  const { id, education } = req.query;
  const user = await accountM.findById(id);
  if (user) {
    user.education.push(education);
    await user.save();
    res.json({
      message: "Education added successfully",
      userEducation: user.education,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// delete education
const deleteEducation = asyncHandler(async (req, res) => {
  const { id, educationId } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.education = user.education.filter(
      (item) => item._id.toString() !== educationId
    );
    await user.save();
    res.json({
      message: "Education deleted successfully",
      userEducation: user.education,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});


// add project
const addProject = asyncHandler(async (req, res) => {
  const { id, project } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.projects.push(project);
    await user.save();
    res.json({
      message: "Project added successfully",
      userProjects: user.projects,
    });
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
    res.json({
      message: "Location added successfully",
      userLocation: user.location,
    });
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
  addProject,
  addLocation,
};