const express = require('express');
const {
  getAllCategories,
} = require('../controllers/categoryController');

const router = express.Router();

// Public routes - no auth required

// GET /api/public/categories - Get all categories for public use (e.g., dropdowns)
router.get('/', getAllCategories);

module.exports = router;