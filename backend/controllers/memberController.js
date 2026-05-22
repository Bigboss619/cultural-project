const db = require('../config/config');
const fs = require('fs');
const path = require('path');

// GET /api/members - Get all members (admin view)
async function getAllMembers(req, res) {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT id, name, role, bio, image_url, display_order, created_at, updated_at
         FROM members
         ORDER BY COALESCE(display_order, 9999) ASC, created_at DESC`,
        [],
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ members: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch members', error: err.message });
  }
}

// GET /api/members/:id - Get member by ID (admin view)
async function getMemberById(req, res) {
  try {
    const { id } = req.params;

    const row = await new Promise((resolve, reject) => {
      db.query(
        `SELECT id, name, role, bio, image_url, display_order, created_at, updated_at
         FROM members
         WHERE id = ?
         LIMIT 1`,
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (!row) return res.status(404).json({ message: 'Member not found' });

    return res.json({ member: row });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch member', error: err.message });
  }
}

// POST /api/members - Create new member
async function createMember(req, res) {
  try {
    const { name, role, bio, display_order = 0 } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'name is required' });
    }

    if (!role || !role.trim()) {
      return res.status(400).json({ message: 'role is required' });
    }

    if (!bio || !bio.trim()) {
      return res.status(400).json({ message: 'bio is required' });
    }

    const imageUrl = req.file ? `/uploads/members/${req.file.filename}` : null;
    const finalOrder = Number(display_order) || 0;

    const result = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO members (name, role, bio, image_url, display_order, created_at)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [name.trim(), role.trim(), bio.trim(), imageUrl, finalOrder],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    return res.status(201).json({ message: 'Member created successfully', memberId: result.insertId });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create member', error: err.message });
  }
}

// PUT /api/members/:id - Update member
async function updateMember(req, res) {
  try {
    const { id } = req.params;
    const { name, role, bio, display_order } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'name is required' });
    }

    if (!role || !role.trim()) {
      return res.status(400).json({ message: 'role is required' });
    }

    if (!bio || !bio.trim()) {
      return res.status(400).json({ message: 'bio is required' });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/members/${req.file.filename}`;
    } else {
      const existing = await new Promise((resolve, reject) => {
        db.query('SELECT image_url FROM members WHERE id = ? LIMIT 1', [id], (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        });
      });
      if (existing && existing.image_url) {
        imageUrl = existing.image_url;
      }
    }

    const finalOrder = Number(display_order) || 0;

    const result = await new Promise((resolve, reject) => {
      db.query(
        `UPDATE members SET name = ?, role = ?, bio = ?, image_url = ?, display_order = ?, updated_at = NOW()
         WHERE id = ?`,
        [name.trim(), role.trim(), bio.trim(), imageUrl, finalOrder, id],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }

    return res.json({ message: 'Member updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update member', error: err.message });
  }
}

// DELETE /api/members/:id - Delete member
async function deleteMember(req, res) {
  try {
    const { id } = req.params;

    const row = await new Promise((resolve, reject) => {
      db.query('SELECT image_url FROM members WHERE id = ? LIMIT 1', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results && results[0] ? results[0] : null);
      });
    });

    if (!row) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Delete the image file if it exists
    if (row.image_url) {
      const imagePath = path.resolve(__dirname, '..', row.image_url.replace(/^\//, ''));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const result = await new Promise((resolve, reject) => {
      db.query('DELETE FROM members WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }

    return res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete member', error: err.message });
  }
}

// GET /api/public/members - Get all members (public view)
async function getAllPublishedMembers(req, res) {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT id, name, role, bio, image_url, display_order
         FROM members
         ORDER BY COALESCE(display_order, 9999) ASC, created_at DESC`,
        [],
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ members: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch members', error: err.message });
  }
}

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  getAllPublishedMembers,
};