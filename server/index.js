const express = require('express');
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
