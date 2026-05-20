const db = require('../config/config');

// GET /api/messages - Get all messages (admin view)
async function getAllMessages(req, res) {
  try {
    const { status, is_read } = req.query || {};

    const whereParts = [];
    const params = [];

    if (status) {
      whereParts.push('m.status = ?');
      params.push(status);
    }
    if (is_read !== undefined) {
      whereParts.push('m.is_read = ?');
      params.push(is_read === 'true' ? 1 : 0);
    }

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          m.id,
          m.full_name,
          m.email,
          m.subject,
          m.message,
          m.is_read,
          m.status,
          m.created_at,
          m.updated_at
        FROM messages m
        ${whereClause}
        ORDER BY m.is_read ASC, m.created_at DESC`,
        params,
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ messages: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
}

// GET /api/messages/:id - Get message by ID (admin view)
async function getMessageById(req, res) {
  try {
    const { id } = req.params;

    const row = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          m.id,
          m.full_name,
          m.email,
          m.subject,
          m.message,
          m.is_read,
          m.status,
          m.created_at,
          m.updated_at
        FROM messages m
        WHERE m.id = ?
        LIMIT 1`,
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (!row) return res.status(404).json({ message: 'Message not found' });

    return res.json({ message: row });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch message', error: err.message });
  }
}

// POST /api/messages - Create new message (public contact form submission)
async function createMessage(req, res) {
  try {
    const {
      full_name,
      email,
      subject,
      message,
    } = req.body || {};

    const finalFullName = String(full_name || '').trim();
    if (!finalFullName) return res.status(400).json({ message: 'full_name is required' });

    const finalEmail = String(email || '').trim();
    if (!finalEmail) return res.status(400).json({ message: 'email is required' });

    const finalSubject = String(subject || '').trim();
    if (!finalSubject) return res.status(400).json({ message: 'subject is required' });

    const finalMessage = String(message || '').trim();
    if (!finalMessage) return res.status(400).json({ message: 'message is required' });

    const row = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO messages
          (full_name, email, subject, message, is_read, status, created_at)
        VALUES (?, ?, ?, ?, 0, 'open', NOW())`,
        [finalFullName, finalEmail, finalSubject, finalMessage],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    return res.status(201).json({ message: 'Message sent successfully', messageId: row.insertId });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
}

// PUT /api/messages/:id - Update message (mark read, change status)
async function updateMessage(req, res) {
  try {
    const { id } = req.params;

    const {
      is_read,
      status,
    } = req.body || {};

    const updates = [];
    const params = [];

    if (is_read !== undefined) {
      updates.push('is_read = ?');
      params.push(is_read ? 1 : 0);
    }
    if (status) {
      updates.push('status = ?');
      params.push(['open', 'closed'].includes(status) ? status : 'open');
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    params.push(id);

    const result = await new Promise((resolve, reject) => {
      db.query(
        `UPDATE messages SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`,
        params,
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    return res.json({ message: 'Message updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update message', error: err.message });
  }
}

// DELETE /api/messages/:id - Delete message
async function deleteMessage(req, res) {
  try {
    const { id } = req.params;

    const result = await new Promise((resolve, reject) => {
      db.query('DELETE FROM messages WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    return res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete message', error: err.message });
  }
}

// PATCH /api/messages/:id/read - Mark message as read
async function markMessageRead(req, res) {
  try {
    const { id } = req.params;

    const result = await new Promise((resolve, reject) => {
      db.query(
        'UPDATE messages SET is_read = 1, updated_at = NOW() WHERE id = ?',
        [id],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    return res.json({ message: 'Message marked as read' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to mark message as read', error: err.message });
  }
}

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
  markMessageRead,
};