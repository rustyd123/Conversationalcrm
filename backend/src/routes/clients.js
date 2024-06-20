const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Client = require('../models/client');  // Corrected import statement

// Create Client
router.post('/', auth, async (req, res) => {
    try {
        const client = new Client({
            ...req.body,
            owner: req.user._id
        });
        await client.save();
        res.status(201).send(client);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get All Clients
router.get('/', auth, async (req, res) => {
    try {
        const clients = await Client.find({ owner: req.user._id });
        res.send(clients);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Client by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const client = await Client.findOne({ _id: req.params.id, owner: req.user._id });
        if (!client) {
            return res.status(404).send();
        }
        res.send(client);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Client
router.put('/:id', auth, async (req, res) => {
    try {
        const client = await Client.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, { new: true, runValidators: true });
        if (!client) {
            return res.status(404).send();
        }
        res.send(client);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete Client
router.delete('/:id', auth, async (req, res) => {
    try {
        const client = await Client.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!client) {
            return res.status(404).send();
        }
        res.send(client);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
