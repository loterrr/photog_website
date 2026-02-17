const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    duration: {
        type: DataTypes.INTEGER, // in minutes
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
});

module.exports = Service;
