const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  // Include details like duration, price, age restrictions, etc.
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
  // You can add more fields as needed
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;