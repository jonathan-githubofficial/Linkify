const mongoose = require("mongoose");

// Define the Account schema
const accountSchema = new mongoose.Schema({
  id: { type: String },
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: [true, 'invalid email']
  },
  password: {
    type: String,
    required: [true,'Please enter your password'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isRecruiter: {
    type: Boolean,
    required: true,
    default: false,
  },
  skills: {
    type: Array,
    required: false,
  },
  languages: {
    type: Array,
    required: false,
  },
  experience: {
    type: Array,
    required: false,
    // default: 0,
  },
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
        required: true,
      },
    },
  ],
  location: {
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
  resume: {
    type: Array,
    required: false,
  },
  coverLetter: {
    type: Array,
    required: false,
  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: false,
    },
  ],
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  postedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
  connectionRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
  notifications: {
    type: Array,
    required: false,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
} ,
{
  timestamps: true
});


// Create the Account model from the schema
const userM = mongoose.model("Account", accountSchema);

// Export the Account model
module.exports = userM;
