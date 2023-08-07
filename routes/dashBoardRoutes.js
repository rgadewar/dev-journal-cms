const express = require('express');
const router = express.Router();
const { Post, User } = require('../models'); // Add the Post model here
const isAuthenticated = require("../utils/middleware/isAuthenticated");

// Route for the dashboard
router.get('/', isAuthenticated, async (req, res) => {
  try {
    // Fetch all posts from the database, including the associated user (belongsTo relationship)
    const posts = await Post.findAll({
      include: User, // Include the associated User data
      order: [['createdAt', 'DESC']], // Optional: Order the posts by creation date, newest first
    });
    const posts_data = posts.map((post)=>{
      return post.get({plain:true})
    })
    // Render the dashboard view and pass the posts data
    res.render('dashboard', { posts_data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

module.exports = router;
