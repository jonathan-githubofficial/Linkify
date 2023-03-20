const express = require("express");
const router = express.Router();
const jobPostsController = require("../controllers/jobsPostsC");

// @desc Get all job posts
// @route GET /api/user/jobPosts/getJobPosts
// @access Public
router.get("/getJobPosts", jobPostsController.getJobPosts);

// @desc Get a job post by ID
// @route GET /api/user/jobPosts/getJobPostById
// @access Public
router.get("/getJobPostById", jobPostsController.getJobPostById);

// @desc Create a new job post
// @route POST /api/user/jobPosts/createJobPost
// @access Private
router.post("/createJobPost", jobPostsController.createJobPost);

// @desc Delete a job post
// @route DELETE /api/user/jobPosts/deleteJobPost
// @access Private
router.delete("/deleteJobPost", jobPostsController.deleteJobPost);

// @desc Update a job post
// @route POST /api/user/jobPosts/updateJobPost
// @access Private
router.post("/updateJobPost", jobPostsController.updateJobPost);

// @desc Get all job posts for a specific user
// @route GET /api/user/jobPosts/getJobsByUser
// @access Private
router.get("/getJobsByUser", jobPostsController.getJobPostsByUser);

// @desc Apply to a job post
// @route POST /api/user/jobPosts/applyForJob
// @access Private
router.post("/applyForJob", jobPostsController.applyToJobPost);

module.exports = router;
