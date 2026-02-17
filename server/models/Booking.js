const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected', 'cancelled', 'completed'),
        defaultValue: 'pending',
    },
    notes: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: true,
});

module.exports = Booking;
