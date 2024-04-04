const router = require('express').Router();
const { User, Blogpost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/user', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    const users = userData.map((user) => user.get({ plain: true }));

    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogpost', async (req, res) => {
  try {
    const postData = await Blogpost.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
