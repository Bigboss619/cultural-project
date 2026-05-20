const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const {
  getAllComments,
  moderateComment,
  deleteComment,
} = require('../controllers/commentController');

const router = express.Router();

// Admin routes
router.get('/', requireAuth, getAllComments);
router.patch('/:id/approve', requireAuth, moderateComment);
router.delete('/:id', requireAuth, deleteComment);

module.exports = router;