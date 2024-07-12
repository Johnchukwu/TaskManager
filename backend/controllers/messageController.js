// controllers/messageController.js
const Message = require('../models/Message');

// Add a new message
const addMessage = async (req, res) => {
  const { content, recipient } = req.body;
  try {
    const newMessage = new Message({
      content,
      recipient,
      sender: req.user.id,
    });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get messages for the logged-in user
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.user.id });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addMessage,
  getMessages,
};
