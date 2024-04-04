const router = require('express').Router();
const { Blogpost } = require('../../models/Blogpost');

router.get('/', async (req, res) => {
  const postData = await Blogpost.findAll();

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
