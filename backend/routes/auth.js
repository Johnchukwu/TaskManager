const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const bcrypt = require('bcrypt');

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

// POST /api/auth/register
router.post('/register', upload.single('profileImage'), async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    let existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    // Create new user with optional profile image
    const newUser = new User({
      username,
      email,
      password,
      profileImage: req.file ? `/uploads/${req.file.filename}` : ''
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login Request:', req.body); // Debugging log

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Invalid password for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error logging in user:', error); // Detailed error logging
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/auth/settings
router.put('/settings', upload.single('profileImage'), async (req, res) => {
  const { userId, username, password } = req.body;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = password;
    }

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;