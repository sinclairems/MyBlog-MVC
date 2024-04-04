// Import
const router = require('express').Router();
const { Blogpost } = require('../../models/Blogpost');

// GET all posts @ http://localhost:3001/api/posts
router.get('/', async (req, res) => {
  try {
    const postData = await Blogpost.findAll();

    res.json(postData)
} catch (err) {
    res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  const postData = await Blogpost.create(req.body);

  return res.json(postData);
});

router.get('/:id', async (req, res) => {
  const postData = await Blogpost.findByPk(req.params.id);

  return res.json(postData);
});

router.put('/:post_id', async (req, res) => {
  const postData = await Blogpost.update(
    {
      title: req.body.title,
      posted_by: req.body.posted_by,
      posted_on: req.body.posted_on,
      content: req.body.content,
    },
    {
      where: {
        post_id: req.params.post_id,
      },
    }
  );

  return res.json(postData);
});

router.delete('/:post_id', async (req, res) => {
  const postData = await Blogpost.destroy({
    where: {
      post_id: req.params.post_id,
    },
  });

  return res.json(postData);
});

module.exports = router;
