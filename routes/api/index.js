const router = require('express').Router();
// const isAuthenticated = require("../../utils/middleware/isAuthenticated");
// Import the routes for posts, comments, and users

const homeRoutes = require('../homeRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

// router.use('/', isAuthenticated, homeRoutes);

router.use('/', homeRoutes);
// Define API routes for posts, comments, and users
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;
