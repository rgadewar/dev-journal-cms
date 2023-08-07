const { Post } = require('../models');
const sequelize = require('../config/connection');

const postData = [
    {
        title: "First Post",
        content: "This is the content of the first post.",
        user_id: 1,
    },
    {
        title: "Second Post",
        content: "This is the content of the second post.",
        user_id: 3,
    }
];

const seedPosts = async () => {
    try {
        console.log('Seeding posts...');

        // Bulk insert posts
        await Post.bulkCreate(postData);

        console.log('Posts seeded successfully!');
    } catch (err) {
        console.error('Error seeding posts:', err);
    }
};

seedPosts();

module.exports = seedPosts;
