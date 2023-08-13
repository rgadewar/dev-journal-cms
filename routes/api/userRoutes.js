const router = require('express').Router();
const { User } = require('../../models');
const passport = require("../../config/passport");
const bcrypt = require('bcrypt');

// Route for user login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      // Authentication failed, return an error response
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // If authentication is successful, log the user in and create a new post
    req.login(user, async (err) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Authentication successful and post created, redirect to the dashboard
      req.session.loggedIn = true;
      res.redirect("/dashboard");
    });
  })(req, res, next);
});



router.post('/signup', async (req, res) => {
  try {
    // Check if a user with the same username already exists in the database
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });

    if (existingUser) {
      // User with the same username already exists, return an error response
      return res.status(409).json({ error: "Username already in use" });
    }

    // Create the new user if the username is unique
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // User created successfully, send a success message in the response
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    // Error during signup, log the error details for debugging
    console.error("Error during user creation:", err);
    res.status(400).json({ error: "Failed to create user" });
  }
});

module.exports = router;

// Route to get a user by ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Route to update a user by ID
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Route to delete a user by ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// POST - user logged out
router.post('/logout', (req, res) => {
  if(req.session.loggedIn){
      req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
}); 


module.exports = router;
