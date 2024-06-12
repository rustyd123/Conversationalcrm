const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = new User({ name, email, password });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user && user.password === password) {
      res.status(200).send('User logged in');
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (error) {
    res.status(400).send('Error logging in user');
  }
});

module.exports = router;
