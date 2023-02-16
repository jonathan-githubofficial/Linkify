const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define jobPost schema
const jobPostSchema = new Schema({
  title: {
    type: String, // Title of the job post
    required: true,
  },
  company: {
    type: String, // Company that posted the job
    required: true,
  },
  location: {
    type: String, // Location of the job
    required: true,
  },
  salary: {
    type: String, // Salary offered for the job
    required: true,
  },
  description: {
    type: String, // Description of the job
    required: true,
  },
  skills: {
    type: Array, // Required skills for the job
    required: true,
  },
  postedBy: {
    type: String, // User who posted the job
    required: true,
  },
  postedOn: {
    type: Date, // Date when the job was posted
    required: true,
  },
  applicants: {
    type: Array, // List of applicants for the job
    required: true,
  },
  status: {
    type: String, // Status of the job post (open, closed, etc.)
    required: true,
  },
});

// Create a Mongoose model for the job post
const JopPost = mongoose.model("JobPost", jobPostSchema);

// Export the JobPost model
module.exports = JopPost;
