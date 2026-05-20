const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
  markMessageRead,
  addReply,
  getReplies,
} = require('../controllers/messageController');

const router = express.Router();

// POST /api/messages - Create new message (public - contact form)
router.post('/', createMessage);

// Protected routes below
router.use(requireAuth);

// GET /api/messages - Get all messages
router.get('/', getAllMessages);

// GET /api/messages/:id - Get message by ID (includes replies)
router.get('/:id', getMessageById);

// GET /api/messages/:id/replies - Get all replies for a message
router.get('/:id/replies', getReplies);

// PUT /api/messages/:id - Update message (status, read)
router.put('/:id', updateMessage);

// PATCH /api/messages/:id - Partial update
router.patch('/:id', updateMessage);

// PATCH /api/messages/:id/read - Mark as read
router.patch('/:id/read', markMessageRead);

// POST /api/messages/:id/reply - Add reply to message
router.post('/:id/reply', addReply);

// DELETE /api/messages/:id - Delete message
router.delete('/:id', deleteMessage);

module.exports = router;