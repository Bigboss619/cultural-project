const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
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

// POST /api/testimonials - Create new testimonial (with image upload)
router.post('/', upload.single('image'), createTestimonial);

// PUT /api/testimonials/:id - Update testimonial (with image upload)
router.put('/:id', upload.single('image'), updateTestimonial);

// PATCH /api/testimonials/:id - Partial update testimonial (with image upload)
router.patch('/:id', upload.single('image'), updateTestimonial);

// DELETE /api/testimonials/:id - Delete testimonial
router.delete('/:id', deleteTestimonial);

module.exports = router;
