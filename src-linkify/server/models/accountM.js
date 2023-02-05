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
    default: 0,
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

const accountM = mongoose.model("Account", accountSchema);

module.exports = accountM;
