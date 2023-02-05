const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
    type: Number,
    required: false,
  },
  education: {
    type: Array,
    required: false,
  },
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
  appliedJobs: {
    type: Array,
    required: false,
  },
  postedJobs: {
    type: Array,
    required: false,
  },
  savedJobs: {
    type: Array,
    required: false,
  },
  savedCompanies: {
    type: Array,
    required: false,
  },
  savedProfiles: {
    type: Array,
    required: false,
  },
  connections: {
    type: Array,
    required: false,
  },
  notifications: {
    type: Array,
    required: false,
  },
  messages: {
    type: Array,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// encrypting password before saving
accountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// decoding password before comparing
accountSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const accountM = mongoose.model("account", accountSchema);

module.exports = accountM;
