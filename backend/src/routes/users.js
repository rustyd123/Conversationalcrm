// src/routes/users.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = user.generateAuthToken();
        res.send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get User Profile
router.get('/profile', auth, async (req, res) => {
    res.send(req.user);
});

module.exports = router;








