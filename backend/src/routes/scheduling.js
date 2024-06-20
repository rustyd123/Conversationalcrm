// src/routes/scheduling.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Schedule = require('../models/Schedule');

// Create Schedule
router.post('/', auth, async (req, res) => {
    try {
        const schedule = new Schedule({
            ...req.body,
            owner: req.user._id
        });
        await schedule.save();
        res.status(201).send(schedule);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get All Schedules
router.get('/', auth, async (req, res) => {
    try {
        const schedules = await Schedule.find({ owner: req.user._id });
        res.send(schedules);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Schedule by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const schedule = await Schedule.findOne({ _id: req.params.id, owner: req.user._id });
        if (!schedule) {
            return res.status(404).send();
        }
        res.send(schedule);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Schedule
router.put('/:id', auth, async (req, res) => {
    try {
        const schedule = await Schedule.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, { new: true, runValidators: true });
        if (!schedule) {
            return res.status(404).send();
        }
        res.send(schedule);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete Schedule
router.delete('/:id', auth, async (req, res) => {
    try {
        const schedule = await Schedule.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!schedule) {
            return res.status(404).send();
        }
        res.send(schedule);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
