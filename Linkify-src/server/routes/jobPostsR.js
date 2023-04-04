const express = require("express");
const router = express.Router();
const jobPostsC = require("../controllers/jobsPostsC");

// @desc Get all job posts
// @route GET /api/user/jobPosts/getJobPosts
// @access Public
router.get("/getJobPosts", jobPostsC.getJobPosts);

// @desc Get a job post by ID
// @route GET /api/user/jobPosts/getJobPostById
// @access Public
router.get("/getJobPostById", jobPostsC.getJobPostById);

// @desc Create a new job post
// @route POST /api/user/jobPosts/createJobPost
// @access Private
router.post("/createJobPost", jobPostsC.createJobPost);

// @desc Delete a job post
// @route DELETE /api/user/jobPosts/deleteJobPost
// @access Private
router.delete("/deleteJobPost", jobPostsC.deleteJobPost);

// @desc Update a job post
// @route PUT /api/user/jobPosts/updateJobPost/:id
// @access Private
router.put("/updateJobPost/:id", jobPostsC.updateJobPost);

// @desc Get all job posts for a specific user
// @route GET /api/user/jobPosts/getJobsByUser
// @access Private
router.get("/getJobsByUser", jobPostsC.getJobPostsByUser);

// @desc Apply to a job post
// @route POST /api/user/jobPosts/applyForJob
// @access Private
router.post("/applyForJob", jobPostsC.applyToJobPost);

// @desc Get applicants for a specific job post
// @route GET /api/user/jobPosts/getApplicantsByJob/:jobId
// @access Private
router.get("/getApplicantsByJob/:jobId", jobPostsC.getApplicantsByJob);


// @desc Update an applicant's resume and cover letter
// @route PUT /api/user/jobPosts/updateApplication/:jobId
// @access Private
router.put("/updateApplication/:jobId", jobPostsC.updateApplicantInfo);

// @desc Reject an applicant
// @route PUT /api/user/jobPosts/rejectApplicant
// @access Private
router.put("/rejectApplicant/:jobId", jobPostsC.rejectApplicant);

module.exports = router;
