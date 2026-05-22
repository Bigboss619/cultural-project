const express = require('express');
const router = express.Router();
const { getPublicSettings } = require('../controllers/settingsController');

// GET /api/public/settings - Get public settings
router.get('/', getPublicSettings);

module.exports = router;