const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  postedOn: {
    type: Date,
    required: true,
  },
  applicants: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const JopPost = mongoose.model("JobPost", jobPostSchema);

module.exports = JopPost;
