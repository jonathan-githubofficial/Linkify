const accountM = require("../models/accountM.js");
const asyncHandler = require("express-async-handler");

// add cover letter
const addCoverLetter = asyncHandler(async (req, res) => {
  const { id, coverLetter } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.coverLetter.push(coverLetter);
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// delete cover letter
const deleteCoverLetter = asyncHandler(async (req, res) => {
  const { id, coverLetter } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.coverLetter = user.coverLetter.filter((item) => item !== coverLetter);
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// add resume
const addResume = asyncHandler(async (req, res) => {
  const { id, resume } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.resume.push(resume);
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// delete resume
const deleteResume = asyncHandler(async (req, res) => {
  const { id, resume } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.resume = user.resume.filter((item) => item !== resume);
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

module.exports = {
  addCoverLetter,
  deleteCoverLetter,
  addResume,
  deleteResume,
};
