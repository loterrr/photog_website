const sequelize = require('../config/database');
const User = require('./User');
const Service = require('./Service');
const Booking = require('./Booking');
const Portfolio = require('./Portfolio');

// Associations
User.hasMany(Booking);
Booking.belongsTo(User);

Service.hasMany(Booking);
Booking.belongsTo(Service);

// Sync models
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); // Set force: true to drop tables on startup
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

module.exports = {
    sequelize,
    User,
    Service,
    Booking,
    Portfolio,
    syncDatabase,
};
