// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

// PUT /api/users/:id
router.put('/:id', upload.single('profileImage'), async (req, res) => {
  const { username, password } = req.body;
  const updatedData = { username };
  if (password) updatedData.password = password;
  if (req.file) updatedData.profileImage = `/uploads/${req.file.filename}`;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});




module.exports = router;
