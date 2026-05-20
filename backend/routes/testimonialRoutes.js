const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// GET /api/testimonials - Get all testimonials
router.get('/', getAllTestimonials);

// GET /api/testimonials/:id - Get testimonial by ID
router.get('/:id', getTestimonialById);

// POST /api/testimonials - Create new testimonial
router.post('/', createTestimonial);

// PUT /api/testimonials/:id - Update testimonial
router.put('/:id', updateTestimonial);

// PATCH /api/testimonials/:id - Partial update testimonial
router.patch('/:id', updateTestimonial);

// DELETE /api/testimonials/:id - Delete testimonial
router.delete('/:id', deleteTestimonial);

module.exports = router;