const Booking = require('../models/bookings'); // If your file is named bookings.js
const Activity = require('../models/activities'); // If your file is named activity.js
const { v4: uuidv4 } = require('uuid'); // For generating unique tokens

exports.createBooking = async (req, res) => {
    try {
        const { activityId, timeSlot } = req.body;
        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        const newBooking = new Booking({
            user: req.user.id, // Assuming req.user is set by authMiddleware
            activity: activityId,
            timeSlot,
            expiresAt: new Date(new Date(timeSlot).getTime() + 30 * 60000), // 30 minutes from timeSlot
            token: uuidv4()
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('activity');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
      // Retrieve the booking ID from the URL parameters and the updates from the request body
      const bookingId = req.params.id;
      const updates = req.body;
  
      // Optional: Validate the updates, e.g., check if the timeSlot is valid, etc.
  
      // Find the booking and update it
      const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updates, { new: true });
      
      // If no booking is found, return a 404 error
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      // Respond with the updated booking
      res.json({ message: "Booking updated successfully", updatedBooking });
    } catch (error) {
      // If an error occurs, send a 500 response
      res.status(500).json({ message: error.message });
    }
  };