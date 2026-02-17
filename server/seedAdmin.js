const { sequelize, User } = require('./models');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const adminEmail = 'admin@luminalens.com';
        const adminPassword = 'adminpassword123';

        const existingAdmin = await User.findOne({ where: { email: adminEmail } });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(adminPassword, salt);

        await User.create({
            name: 'Admin User',
            email: adminEmail,
            password_hash: password_hash,
            role: 'admin'
        });

        console.log('Admin user created successfully.');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        await sequelize.close();
    }
};

if (require.main === module) {
    seedAdmin();
}

module.exports = seedAdmin;
