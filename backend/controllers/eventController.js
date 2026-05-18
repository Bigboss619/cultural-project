const db = require('../config/config');

// Slug generator
function slugify(input) {
  return (input || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// GET /api/events - Get all events (admin view, all statuses)
async function getAllEvents(req, res) {
  try {
    const { status } = req.query || {};

    const whereParts = [];
    const params = [];

    if (status) {
      whereParts.push('e.status = ?');
      params.push(status);
    }

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

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
          e.status,
          e.rsvp_enabled,
          e.rsvp_seats,
          e.rsvp_accepted,
          e.ticket_links,
          e.created_by,
          e.created_at,
          e.updated_at
        FROM events e
        ${whereClause}
        ORDER BY e.start_date DESC`,
        params,
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    // Parse ticket_links JSON if exists
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
}

// GET /api/events/:id - Get event by ID (admin view)
async function getEventById(req, res) {
  try {
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
          e.status,
          e.rsvp_enabled,
          e.rsvp_seats,
          e.rsvp_accepted,
          e.ticket_links,
          e.created_by,
          e.created_at,
          e.updated_at
        FROM events e
        WHERE e.id = ?
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
}

// POST /api/events - Create new event
async function createEvent(req, res) {
  try {
    const {
      title,
      description,
      start_date,
      end_date,
      start_time,
      end_time,
      location,
      category,
      banner_image,
      status = 'draft',
      rsvp_enabled = false,
      rsvp_seats = 0,
      ticket_links = [],
    } = req.body || {};

    const finalTitle = String(title || '').trim();
    if (!finalTitle) return res.status(400).json({ message: 'title is required' });

    const finalSlug = slugify(finalTitle);
    if (!finalSlug) return res.status(400).json({ message: 'slug could not be generated from title' });

    const finalStartDate = start_date || null;
    const finalEndDate = end_date || null;
    const finalLocation = String(location || '').trim();
    const finalCategory = String(category || 'General').trim();

    if (!finalLocation) return res.status(400).json({ message: 'location is required' });
    if (!finalStartDate) return res.status(400).json({ message: 'start_date is required' });

    const finalStatus = ['draft', 'published'].includes(status) ? status : 'draft';
    const finalRsvpEnabled = Boolean(rsvp_enabled);
    const finalRsvpSeats = Number(rsvp_seats) || 0;

    const ticketLinksJson = JSON.stringify(ticket_links || []);

    const userId = req.user?.userId || req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const row = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO events
          (title, slug, description, start_date, end_date, start_time, end_time, location, category, banner_image, status, rsvp_enabled, rsvp_seats, ticket_links, created_by, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [finalTitle, finalSlug, description || '', finalStartDate, finalEndDate, start_time || null, end_time || null, finalLocation, finalCategory, banner_image || null, finalStatus, finalRsvpEnabled ? 1 : 0, finalRsvpSeats, ticketLinksJson, userId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    return res.status(201).json({ message: 'Event created successfully', eventId: row.insertId });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
}

// PUT /api/events/:id - Update event
async function updateEvent(req, res) {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      start_date,
      end_date,
      start_time,
      end_time,
      location,
      category,
      banner_image,
      status = 'draft',
      rsvp_enabled = false,
      rsvp_seats = 0,
      ticket_links = [],
    } = req.body || {};

    const finalTitle = String(title || '').trim();
    if (!finalTitle) return res.status(400).json({ message: 'title is required' });

    const finalSlug = slugify(finalTitle);
    if (!finalSlug) return res.status(400).json({ message: 'slug could not be generated from title' });

    const finalStartDate = start_date || null;
    const finalEndDate = end_date || null;
    const finalLocation = String(location || '').trim();
    const finalCategory = String(category || 'General').trim();

    if (!finalLocation) return res.status(400).json({ message: 'location is required' });
    if (!finalStartDate) return res.status(400).json({ message: 'start_date is required' });

    const finalStatus = ['draft', 'published'].includes(status) ? status : 'draft';
    const finalRsvpEnabled = Boolean(rsvp_enabled);
    const finalRsvpSeats = Number(rsvp_seats) || 0;

    const ticketLinksJson = JSON.stringify(ticket_links || []);

    const result = await new Promise((resolve, reject) => {
      db.query(
        `UPDATE events SET
          title = ?,
          slug = ?,
          description = ?,
          start_date = ?,
          end_date = ?,
          start_time = ?,
          end_time = ?,
          location = ?,
          category = ?,
          banner_image = ?,
          status = ?,
          rsvp_enabled = ?,
          rsvp_seats = ?,
          ticket_links = ?,
          updated_at = NOW()
        WHERE id = ?`,
        [finalTitle, finalSlug, description || '', finalStartDate, finalEndDate, start_time || null, end_time || null, finalLocation, finalCategory, banner_image || null, finalStatus, finalRsvpEnabled ? 1 : 0, finalRsvpSeats, ticketLinksJson, id],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.json({ message: 'Event updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update event', error: err.message });
  }
}

// DELETE /api/events/:id - Delete event
async function deleteEvent(req, res) {
  try {
    const { id } = req.params;

    const result = await new Promise((resolve, reject) => {
      db.query('DELETE FROM events WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
}

// POST /api/events/:id/rsvp - RSVP for an event (public)
async function rsvpEvent(req, res) {
  try {
    const { id } = req.params;
    const { name, email } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ message: 'name and email are required' });
    }

    // Get event to check RSVP status
    const event = await new Promise((resolve, reject) => {
      db.query(
        'SELECT id, rsvp_enabled, rsvp_seats, rsvp_accepted FROM events WHERE id = ? AND status = "published" LIMIT 1',
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (!event.rsvp_enabled) {
      return res.status(400).json({ message: 'RSVP is not enabled for this event' });
    }

    if (event.rsvp_accepted >= event.rsvp_seats) {
      return res.status(400).json({ message: 'Sorry, all seats are taken' });
    }

    // Check if already RSVP'd
    const existingRsvp = await new Promise((resolve, reject) => {
      db.query(
        'SELECT id FROM event_rsvps WHERE event_id = ? AND email = ? LIMIT 1',
        [id, email],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (existingRsvp) {
      return res.status(400).json({ message: 'You have already RSVP\'d for this event' });
    }

    // Create RSVP
    await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO event_rsvps (event_id, name, email, created_at) VALUES (?, ?, ?, NOW())',
        [id, name, email],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    // Increment accepted count
    await new Promise((resolve, reject) => {
      db.query(
        'UPDATE events SET rsvp_accepted = rsvp_accepted + 1 WHERE id = ?',
        [id],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    return res.status(201).json({ message: 'RSVP successful' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to RSVP', error: err.message });
  }
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  rsvpEvent,
};