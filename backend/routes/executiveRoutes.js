const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  getAllExecutives,
  getExecutiveById,
  createExecutive,
  updateExecutive,
  deleteExecutive,
} = require('../controllers/executiveController');

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// GET /api/executives - Get all executives
router.get('/', getAllExecutives);

// GET /api/executives/:id - Get executive by ID
router.get('/:id', getExecutiveById);

// POST /api/executives - Create new executive
router.post('/', upload.single('image'), createExecutive);

// PUT /api/executives/:id - Update executive
router.put('/:id', upload.single('image'), updateExecutive);

// PATCH /api/executives/:id - Partial update executive
router.patch('/:id', upload.single('image'), updateExecutive);

// DELETE /api/executives/:id - Delete executive
router.delete('/:id', deleteExecutive);

module.exports = router;