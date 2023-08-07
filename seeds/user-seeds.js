const { User } = require('../models');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

const userData = [
    {
        username: 'user1',
        password: 'password1',
    },
    {
        username: 'user2',
        password: 'password2',
    }
];

const seedUsers = async () => {
    try {
        console.log('Seeding users...');

        // Bulk insert users
        await User.bulkCreate(userData, { individualHooks: true });

        console.log('Users seeded successfully!');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
};

seedUsers();

module.exports = seedUsers;
