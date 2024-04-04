const router = require('express').Router();
const { User } = require('../../models/User');

// Get all users @ http://localhost:3001/api/users
router.get('/', async (req, res) => {
  try {
    const UserData = await User.findAll();

    res.status(200).json(UserData)
  } catch (err) {
    res.status(500).json(err);
  }
})

// Create a User
router.post('/', async (req, res) => {
  try {
    const UserData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = UserData.id;
      req.session.logged_in = true;

      res.status(200).json(UserData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login a User
route.post('/login', async (req, res) => {
  try {
    const UserData = await User.findOne({ where: { email: req.body.email } });

    if (!UserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await UserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = UserData.id;
      req.session.logged_in = true;

      res.json({ user: UserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout a User
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Delete a User
router.delete('/:id', async (req, res) => {
  try {
    const UserData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!UserData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(UserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
