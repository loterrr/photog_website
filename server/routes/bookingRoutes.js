const express = require('express');
const router = express.Router();
const { getBookings, createBooking, updateBookingStatus } = require('../controllers/bookingController');
const { auth, admin } = require('../middleware/authMiddleware');

router.get('/', auth, getBookings);
router.post('/', auth, createBooking);
router.put('/:id/status', auth, admin, updateBookingStatus);

module.exports = router;
