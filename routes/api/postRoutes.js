const express = require('express');
const router = express.Router();
const isAuthenticated = require("../../utils/middleware/isAuthenticated");
const Post = require('../../models/Post');
const posts = [];

// Route to get all posts
router.get('/', (req, res) => {
  try {
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      console.log('Post not found');
      return res.status(404).json({ error: 'Post not found' });
    }
    console.log('Found Post:', post);

    res.render('edit-post', post);
  } catch (err) {
    console.error('Error fetching post:', err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create the new post in the database
    const newPost = await Post.create({
      title,
      content,
      user_id: req.user.id,
    });

    res.status(201).json({ message: 'Post created successfully!', post: newPost });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a post by ID
router.put('/:id', async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  try {
    // Find the post by its ID
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update the post properties
    post.title = title;
    post.content = content;

    // Save the updated post to the database
    await post.save();

    res.json(post); // Respond with the updated post
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

router.delete('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete the post from the database
    await post.destroy();

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});


// Route to render the edit-post.handlebars view
router.get('/edit-post/:id', (req, res) => {
  const postId = req.params.id.toString(); // Convert postId to a string
  try {
    const post = posts.find((post) => post.id === postId);
    if (!post) {
      res.status(404).send('Post not found');
      return;
    }
    // Render the 'edit-post.handlebars' template with the post data
    res.render('edit-post', { post });
  } catch (error) {
    console.error('Error fetching post:', error);
    // Handle error, e.g., display an error page or redirect with a message.
    res.status(500).send('Error fetching post details');
  }
});


module.exports = router;
