const express = require('express');
const {
  getAllPublishedTestimonials,
} = require('../controllers/testimonialController');

const router = express.Router();

// Public routes - no auth required

// GET /api/public/testimonials - Get all published testimonials for public website
router.get('/', getAllPublishedTestimonials);

module.exports = router;