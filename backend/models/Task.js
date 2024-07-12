// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['normal', 'important', 'less_important'],
    default: 'normal',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
