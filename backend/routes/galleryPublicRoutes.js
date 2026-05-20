const express = require('express');
const {
  getAllPublishedGalleryItems,
} = require('../controllers/galleryController');

const router = express.Router();

// Public routes - no auth required

// GET /api/public/gallery - Get all published gallery items for public website
router.get('/', getAllPublishedGalleryItems);

module.exports = router;