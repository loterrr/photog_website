const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Portfolio = sequelize.define('Portfolio', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
});

module.exports = Portfolio;
