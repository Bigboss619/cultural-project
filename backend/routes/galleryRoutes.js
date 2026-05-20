const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  getAllGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// GET /api/gallery - Get all gallery items
router.get('/', getAllGalleryItems);

// GET /api/gallery/:id - Get gallery item by ID
router.get('/:id', getGalleryItemById);

// POST /api/gallery - Create new gallery item (with image upload)
router.post('/', upload.single('image'), createGalleryItem);

// PUT /api/gallery/:id - Update gallery item (with image upload)
router.put('/:id', upload.single('image'), updateGalleryItem);

// PATCH /api/gallery/:id - Partial update gallery item (with image upload)
router.patch('/:id', upload.single('image'), updateGalleryItem);

// DELETE /api/gallery/:id - Delete gallery item
router.delete('/:id', deleteGalleryItem);

module.exports = router;