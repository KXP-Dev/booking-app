const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookingController.createBooking);
router.get('/user', authMiddleware, bookingController.getUserBookings); // Route to get user bookings
router.get('/', authMiddleware, bookingController.getAllBookings); // Route to get all bookings (for admin)
router.delete('/:id', authMiddleware, bookingController.deleteBooking);
router.put('/:id', authMiddleware, bookingController.updateBooking);

module.exports = router;