const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Invoice = require('../models/invoice'); // Ensure the correct path to the model

// Create Invoice
router.post('/', auth, async (req, res) => {
    try {
        const invoice = new Invoice({
            ...req.body,
            owner: req.user._id
        });
        await invoice.save();
        res.status(201).send(invoice);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get All Invoices
router.get('/', auth, async (req, res) => {
    try {
        const invoices = await Invoice.find({ owner: req.user._id });
        res.send(invoices);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Invoice by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const invoice = await Invoice.findOne({ _id: req.params.id, owner: req.user._id });
        if (!invoice) {
            return res.status(404).send();
        }
        res.send(invoice);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Invoice
router.put('/:id', auth, async (req, res) => {
    try {
        const invoice = await Invoice.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!invoice) {
            return res.status(404).send();
        }
        res.send(invoice);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete Invoice
router.delete('/:id', auth, async (req, res) => {
    try {
        const invoice = await Invoice.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!invoice) {
            return res.status(404).send();
        }
        res.send(invoice);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
