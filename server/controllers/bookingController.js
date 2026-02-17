const { Booking, Service, User } = require('../models');

const getBookings = async (req, res) => {
    try {
        let bookings;
        if (req.user.role === 'admin') {
            bookings = await Booking.findAll({ include: [User, Service] });
        } else {
            bookings = await Booking.findAll({
                where: { UserId: req.user.id },
                include: [Service]
            });
        }
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createBooking = async (req, res) => {
    try {
        const { serviceId, date, notes } = req.body;

        // Simple validation: check if slot is taken (basic implementation)
        // In a real app, you'd check for overlap based on service duration
        const existingBooking = await Booking.findOne({
            where: {
                date: date,
                status: ['pending', 'approved']
            }
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        const booking = await Booking.create({
            UserId: req.user.id,
            ServiceId: serviceId,
            date,
            notes,
            status: 'pending'
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        await booking.update({ status });
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getBookings, createBooking, updateBookingStatus };
