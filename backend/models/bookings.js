const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activity: {
    type: Schema.Types.ObjectId,
    ref: 'Activity',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  }
  // Additional fields like status, payment information, etc. can be added
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;