const { Comment } = require('../models');
const sequelize = require('../config/connection');

const commentData = [
    {
        comment_text: "Comment 1 on First Post",
        user_id: 1,
        post_id: 1,
    },
    {
        comment_text: "Comment 2 on First Post",
        user_id: 2,
        post_id: 2,
    }
];

const seedComments = async () => {
    try {
        console.log('Seeding comments...');

        // Bulk insert comments
        await Comment.bulkCreate(commentData);

        console.log('Comments seeded successfully!');
    } catch (err) {  
        console.error('Error seeding comments:', err);
    }
};

seedComments();

module.exports = seedComments;
