const express = require('express');
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');
// Trigger restart
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, syncDatabase } = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));

// Temporary Seed Route
const seedServices = require('./seedServices');
app.get('/api/seed', async (req, res) => {
    try {
        await seedServices();
        res.send('Database seeded successfully!');
    } catch (error) {
        res.status(500).send('Error seeding database: ' + error.message);
    }
});


// Basic route
app.get('/', (req, res) => {
    res.send('Photography Booking API is running');
});

// Database connection and server start
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        await syncDatabase();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
