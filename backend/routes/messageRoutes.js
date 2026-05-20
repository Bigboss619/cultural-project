const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
  markMessageRead,
} = require('../controllers/messageController');

const router = express.Router();

// POST /api/messages - Create new message (public - contact form)
router.post('/', createMessage);

// Protected routes below
router.use(requireAuth);

// GET /api/messages - Get all messages
router.get('/', getAllMessages);

// GET /api/messages/:id - Get message by ID
router.get('/:id', getMessageById);

// PUT /api/messages/:id - Update message (status, read)
router.put('/:id', updateMessage);

// PATCH /api/messages/:id - Partial update
router.patch('/:id', updateMessage);

// PATCH /api/messages/:id/read - Mark as read
router.patch('/:id/read', markMessageRead);

// DELETE /api/messages/:id - Delete message
router.delete('/:id', deleteMessage);

module.exports = router;