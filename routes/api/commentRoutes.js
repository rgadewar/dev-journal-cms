// commentRoutes.js
const router = require('express').Router();
const { Comment } = require('../../models');

// Route to get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});


// Route to get a comment by ID along with associated user and post
// router.get('/:id', async (req, res) => {
//   const commentId = req.params.id;

//   try {
//     const comment = await Comment.findByPk(commentId, {
//       include: [
//         { model: User, as: 'user' }, // Include user information
//         { model: Post, as: 'post' } // Include associated post
//       ]
//     });

//     if (!comment) {
//       return res.status(404).json({ error: 'Comment not found' });
//     }

//     res.json(comment);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch comment' });
//   }
// });

// Route to get a post by ID along with associated comments and user information
router.get('/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, as: 'user' }, // Include user information
        { model: Comment, include: { model: User, as: 'user' } } // Include associated comments with user information
      ]
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Route to create a new comment
router.post('/', async (req, res) => {
  const { comment_text, user_id, post_id } = req.body;
  try {
    const comment = await Comment.create({ comment_text, user_id, post_id });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// Route to update a comment by ID
router.put('/:id', async (req, res) => {
  const commentId = req.params.id;
  const { comment_text } = req.body;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    comment.comment_text = comment_text;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// Route to delete a comment by ID
router.delete('/:id', async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// // Route to render the "add-comment" form
// router.get('/add-comment', async (req, res) => {
//   try {
//     const postId = req.query.post_id;
//     const post = await Post.findByPk(postId);

//     res.render('add-comment', { post_id: postId });
//   } catch (err) {
//     console.error('Error rendering add-comment form:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Handle the form submission to add a comment (POST request)
router.post('/add-comment', async (req, res) => {
  const { comment_text, user_id, post_id } = req.body;
  try {
    const { post_id, user_id, comment_text } = req.body;

    // Check if all required fields are present in the request body
    if (!post_id || !user_id || !comment_text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newComment = await Comment.create({
      comment_text,
      user_id,
      post_id,
    });

    res.redirect(`/dashboard`);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
