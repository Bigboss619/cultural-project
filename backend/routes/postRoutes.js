const express = require('express');

const { requireAuth } = require('../middleware/authMiddleware');

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const router = express.Router();

// Admin CRUD
router.get('/', requireAuth, getAllPosts);
router.get('/:id', requireAuth, getPostById);

router.post('/', requireAuth, createPost);
router.put('/:id', requireAuth, updatePost);
router.patch('/:id', requireAuth, updatePost);

router.delete('/:id', requireAuth, deletePost);

module.exports = router;

