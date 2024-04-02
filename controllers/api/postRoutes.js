const router = require('express').Router();
const Book = require('../../models/Blogpost');

// Change the anonymous callback function to become Asynchronous
router.get('/', async (req, res) => {
  // Store the bookData in a variable once the promise is resolved.
  const postData = await Blogpost.findAll();

  // Return the bookData promise inside of the JSON response
  return res.json(postData);
});

router.post('/', async (req, res) => {
  const postData = await Blogpost.create(req.body);

  return res.json(postData);
});

router.get('/:id', async (req, res) => {
  const postData = await Blogpost.findByPk(req.params.id);

  return res.json(postData);
});

router.post('/', async (req, res) => {
  const postData = await Blogpost.create(req.body);

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
