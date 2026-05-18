const db = require('../config/config');
const express = require('express');
const {
  rsvpEvent,
} = require('../controllers/eventController');

const router = express.Router();

// Public routes - no auth required

// GET /api/public/events - Get all published events for public website
router.get('/', async (req, res) => {
  try {
    // const db = require('../config/config');

    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          e.id,
          e.title,
          e.slug,
          e.description,
          e.start_date,
          e.end_date,
          e.start_time,
          e.end_time,
          e.location,
          e.category,
          e.banner_image,
          e.rsvp_enabled,
          e.rsvp_seats,
          e.rsvp_accepted,
          e.ticket_links
        FROM events e
        WHERE e.status = 'published'
        ORDER BY e.start_date ASC`,
        [],
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    const events = rows.map(event => ({
      ...event,
      ticket_links: event.ticket_links ? JSON.parse(event.ticket_links) : [],
      rsvp_enabled: Boolean(event.rsvp_enabled),
      rsvp_accepted: event.rsvp_accepted || 0,
    }));

    return res.json({ events });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
});

// GET /api/public/events/:id - Get single published event
router.get('/:id', async (req, res) => {
  try {
    const db = require('../config/config');
    const { id } = req.params;

    const row = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          e.id,
          e.title,
          e.slug,
          e.description,
          e.start_date,
          e.end_date,
          e.start_time,
          e.end_time,
          e.location,
          e.category,
          e.banner_image,
          e.rsvp_enabled,
          e.rsvp_seats,
          e.rsvp_accepted,
          e.ticket_links
        FROM events e
        WHERE e.id = ? AND e.status = 'published'
        LIMIT 1`,
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (!row) return res.status(404).json({ message: 'Event not found' });

    return res.json({
      event: {
        ...row,
        ticket_links: row.ticket_links ? JSON.parse(row.ticket_links) : [],
        rsvp_enabled: Boolean(row.rsvp_enabled),
        rsvp_accepted: row.rsvp_accepted || 0,
      }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch event', error: err.message });
  }
});

// POST /api/public/events/:id/rsvp - RSVP for an event
router.post('/:id/rsvp', rsvpEvent);

module.exports = router;