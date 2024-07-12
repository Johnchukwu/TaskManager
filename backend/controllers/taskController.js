const Task = require('../models/Task');

exports.addTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const userId = req.user ? req.user.id : null;

    if (userId) {
      const newTask = new Task({
        user: userId,
        title,
        description,
        priority,
      });

      const task = await newTask.save();
      res.status(201).json(task);
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    if (userId) {
      const tasks = await Task.find({ user: userId });
      res.json(tasks);
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
