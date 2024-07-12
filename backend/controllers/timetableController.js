const Timetable = require('../models/Timetable');

exports.addTimetable = async (req, res) => {
  const { title, description, time, day } = req.body;

  try {
    const timetable = new Timetable({
      user: req.user.id,
      title,
      description,
      time,
      day,
    });

    const createdTimetable = await timetable.save();
    res.status(201).json(createdTimetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find({ user: req.user.id });
    res.json(timetables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTimetable = async (req, res) => {
  const { id } = req.params;
  const { title, description, time, day } = req.body;

  try {
    const timetable = await Timetable.findById(id);

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    if (timetable.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    timetable.title = title || timetable.title;
    timetable.description = description || timetable.description;
    timetable.time = time || timetable.time;
    timetable.day = day || timetable.day;

    const updatedTimetable = await timetable.save();
    res.json(updatedTimetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTimetable = async (req, res) => {
  const { id } = req.params;

  try {
    const timetable = await Timetable.findById(id);

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    if (timetable.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await timetable.remove();
    res.json({ message: 'Timetable removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
