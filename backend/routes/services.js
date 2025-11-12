const express = require('express');
const router = express.Router();

// Fake data for services
const services = [
    { id: 1, name: 'Full Packing Service', description: 'We pack everything for you.' },
    { id: 2, name: 'Moving Service', description: 'We move your items safely.' },
    { id: 3, name: 'Storage Service', description: 'We store your items securely.' }
];

// GET /api/services
router.get('/', (req, res) => {
    res.json(services);
});

module.exports = router;
