const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  time: { type: String, required: true },
  day: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Check if the model exists before defining it
if (mongoose.models.Timetable) {
    module.exports = mongoose.model('Timetable');
} else {
    const Timetable = mongoose.model('Timetable', timetableSchema);
    module.exports = Timetable;
}
