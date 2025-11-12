const express = require('express');
const router = express.Router();

// POST /api/contact
router.post('/', (req, res) => {
    const { name, email, message } = req.body;
    // In real app, save to DB or send email
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    // For now, just echo back
    res.json({ success: true, data: { name, email, message } });
});

module.exports = router;
