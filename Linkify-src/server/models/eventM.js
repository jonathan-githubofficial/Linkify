const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const eventM = mongoose.model('Event', eventSchema);

module.exports = eventM;
