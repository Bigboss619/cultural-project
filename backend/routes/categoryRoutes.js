const express = require('express');

const { requireAuth } = require('../middleware/authMiddleware');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const router = express.Router();

// Protect all category endpoints (editable + deletable)
router.get('/', requireAuth, getAllCategories);
router.get('/:id', requireAuth, getCategoryById);

router.post('/', requireAuth, createCategory);
router.put('/:id', requireAuth, updateCategory);
router.patch('/:id', requireAuth, updateCategory);
router.delete('/:id', requireAuth, deleteCategory);

module.exports = router;

