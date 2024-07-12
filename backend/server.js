// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
 
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Import routes
//const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const messageRoutes = require('./routes/messages'); // Add this line
const userRoutes = require('./routes/user');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/messages', messageRoutes); // Add this line
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Task Manager API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
