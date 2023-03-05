const jobPostsC = require("../controllers/jobsPostsC");
const express = require("express");
const router = express.Router();

router.get("/getJobPosts", jobPostsC.getJobPosts);
router.get("/getJobPostById", jobPostsC.getJobPostById);
router.post("/createJobPost", jobPostsC.createJobPost);
router.delete("/deleteJobPost", jobPostsC.deleteJobPost);
router.post("/updateJobPost", jobPostsC.updateJobPost);
router.get("/getJobsByUser", jobPostsC.getJobPostsByUser);
router.post("/applyForJob", jobPostsC.applyToJobPost);

module.exports = router;
