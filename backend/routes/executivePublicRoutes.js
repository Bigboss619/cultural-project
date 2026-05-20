const express = require('express');
const {
  getAllPublishedExecutives,
} = require('../controllers/executiveController');

const router = express.Router();

// Public routes - no auth required

// GET /api/public/executives - Get all published executives for public website
router.get('/', getAllPublishedExecutives);

module.exports = router;