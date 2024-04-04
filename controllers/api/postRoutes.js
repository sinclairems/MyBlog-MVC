// Import
const router = require('express').Router();
const { Blogpost } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts @ http://localhost:3001/api/posts
router.get('/', async (req, res) => {
  try {
    const postData = await Blogpost.findAll();

    res.json(postData)
} catch (err) {
    res.status(500).json(err);
}
});

// Create a post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogpost = await Blogpost.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newBlogpost)
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    const blogpostData = await Blogpost.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!blogpostData[0]) {
      res.status(404).json({ message: 'No post found with this id :(' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No post found with this id :(' });
      return;
    }

    res.status(200).json(blogpostData);

  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
