const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');

const app = express();

// Environment variables
require('dotenv').config();

// Middleware to handle CORS issues
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Test API endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Easy Booking App API!' });
});

// User routes
app.use('/api/users', userRoutes);

// Serve static files from the public directory (if needed)
app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define the port number and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));