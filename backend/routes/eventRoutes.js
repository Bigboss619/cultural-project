const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// GET /api/events - Get all events
router.get('/', getAllEvents);

// GET /api/events/:id - Get event by ID
router.get('/:id', getEventById);

// POST /api/events - Create new event
router.post('/', createEvent);

// PUT /api/events/:id - Update event
router.put('/:id', updateEvent);

// PATCH /api/events/:id - Partial update event
router.patch('/:id', updateEvent);

// DELETE /api/events/:id - Delete event
router.delete('/:id', deleteEvent);

module.exports = router;