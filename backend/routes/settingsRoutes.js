const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { getAllSettings, updateSettings } = require('../controllers/settingsController');

// GET /api/settings - Get all settings (admin)
router.get('/', requireAuth, getAllSettings);

// PUT /api/settings - Update settings (admin, supports file uploads)
router.put('/', requireAuth, upload.fields([
  { name: 'hero_image', maxCount: 1 },
  { name: 'about_image', maxCount: 1 },
]), updateSettings);

module.exports = router;