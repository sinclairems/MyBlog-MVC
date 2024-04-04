const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// api/users
router.use('/users', userRoutes);
// api/posts
router.use('/posts', postRoutes);

module.exports = router;
