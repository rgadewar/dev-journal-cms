const router = require('express').Router();
const { Post, User, Comment } = require('../models');

const passport = require("../config/passport");
const isAuthenticated = require("../utils/middleware/isAuthenticated"); // Require the middleware file

router.get('/login', (req, res) => {
if (req.session.loggedIn) {
    res.redirect('/');
    return;
}
res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});
router.get('/create-post', isAuthenticated, (req, res) => {
  // You can access the "loggedIn" flag from the "req.session" object
  const loggedIn = req.session.loggedIn;

  // Now you can pass the "loggedIn" flag to the template when rendering the "create-post" view
  res.render('create-post', { loggedIn });
});
  
router.get("/dashboard",  isAuthenticated, async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.findAll();

    // Assuming you have other data to pass as well
    const dataContext = {
      loggedIn: req.session.loggedIn,
      posts_data: posts, // Pass the fetched posts to the data context
      // Other data properties you want to pass to the template
    };

    // Render the "dashboard" layout with the data context
    res.render("dashboard", dataContext);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/', async (req, res) => {
  try {
    // Fetch posts_data from the database (assuming you have a Post model)
    const posts_data = await Post.findAll({
      include: [{ model: User, as: 'user' }], // Include the associated User data for the post's creator
      order: [['createdAt', 'DESC']], // Order the posts by the latest first
    });

    // The "isAuthenticated" middleware has already been called, and it sets the "loggedIn" variable in the req object
    const loggedIn = req.session.loggedIn;

    // Render the homepage view with the fetched data and the "loggedIn" variable
    res.render('homepage', { posts_data, loggedIn });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/add-comment', isAuthenticated, async (req, res) => {
  try {
    const postId = req.query.post_id;
    const post = await Post.findByPk(postId);
    const user_id = req.user.id; // Assuming the user ID is available in req.user
    // console.log("In add comment route" + req.user.id);

    res.render('add-comment', { post_id: postId, user_id: req.user.id });
  } catch (err) {
    console.error('Error rendering add-comment form:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to render the "View Comments" page
router.get('/view-comments/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByPk(postId, { include: [
      User,
      {
        model: Comment,
        include: User
      }
    ] });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Render the view-comments handlebars template and pass the post and its comments to it
    res.render('view-comments', { post: post });
  } catch (err) {
    console.error('Error rendering view-comments page:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


