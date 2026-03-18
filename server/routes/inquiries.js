const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch inquiries' });
  }
});

router.post('/', async (req, res) => {
  const { role, name, email, phone, message } = req.body;
  if (!role || !name || !email) {
    return res.status(400).json({ message: 'role, name, email are required' });
  }

  try {
    const inquiry = new Inquiry({ role, name, email, phone, message });
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry created successfully', inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Could not save inquiry' });
  }
});

module.exports = router;
