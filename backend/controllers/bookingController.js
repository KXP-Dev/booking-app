const Booking = require('../models/bookings'); // Assuming your file is named bookings.js
const Activity = require('../models/activities'); // Assuming your file is named activities.js
const { v4: uuidv4 } = require('uuid');

exports.createBooking = async (req, res) => {
    try {
        const { activityId, timeSlot } = req.body;
        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        const newBooking = new Booking({
            user: req.user.id,
            activity: activityId,
            timeSlot,
            expiresAt: new Date(new Date(timeSlot).getTime() + 30 * 60000),
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
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to cancel this booking' });
        }

        await Booking.findByIdAndDelete(bookingId);
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
        const bookingId = req.params.id;
        const updates = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updates, { new: true });
      
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking updated successfully", updatedBooking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user').populate('activity');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};