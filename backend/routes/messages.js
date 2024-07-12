// routes/messages.js
const express = require('express');
const router = express.Router();
const { addMessage, getMessages } = require('../controllers/messageController');
const auth = require('../middleware/authMiddleware'); // Ensure the path is correct

router.post('/', auth, addMessage);
router.get('/', auth, getMessages);

module.exports = router;
