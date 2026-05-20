const db = require('../config/config');

// GET /api/executives - Get all executives (admin view)
async function getAllExecutives(req, res) {
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
          e.name,
          e.position,
          e.image_url,
          e.bio,
          e.status,
          e.display_order,
          e.created_at,
          e.updated_at
        FROM executives e
        ${whereClause}
        ORDER BY COALESCE(e.display_order, 9999) ASC, e.created_at DESC`,
        params,
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ executives: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch executives', error: err.message });
  }
}

// GET /api/executives/:id - Get executive by ID (admin view)
async function getExecutiveById(req, res) {
  try {
    const { id } = req.params;

    const row = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          e.id,
          e.name,
          e.position,
          e.image_url,
          e.bio,
          e.status,
          e.display_order,
          e.created_at,
          e.updated_at
        FROM executives e
        WHERE e.id = ?
        LIMIT 1`,
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (!row) return res.status(404).json({ message: 'Executive not found' });

    return res.json({ executive: row });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch executive', error: err.message });
  }
}

// POST /api/executives - Create new executive
async function createExecutive(req, res) {
  try {
    const {
      name,
      position,
      bio,
      status = 'draft',
      display_order = 0,
    } = req.body || {};

    const finalName = String(name || '').trim();
    if (!finalName) return res.status(400).json({ message: 'name is required' });

    const finalPosition = String(position || '').trim();
    if (!finalPosition) return res.status(400).json({ message: 'position is required' });

    // Handle file upload - multer puts info in req.file
    const finalImageUrl = req.file ? `/uploads/executive/${req.file.filename}` : null;
    const finalBio = bio ? String(bio).trim() : null;
    const finalStatus = ['draft', 'published'].includes(status) ? status : 'draft';
    const finalOrder = Number(display_order) || 0;

    const row = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO executives
          (name, position, image_url, bio, status, display_order, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [finalName, finalPosition, finalImageUrl, finalBio, finalStatus, finalOrder],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    return res.status(201).json({ message: 'Executive created successfully', executiveId: row.insertId });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create executive', error: err.message });
  }
}

// PUT /api/executives/:id - Update executive
async function updateExecutive(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      position,
      bio,
      status = 'draft',
      display_order = 0,
    } = req.body || {};

    const finalName = String(name || '').trim();
    if (!finalName) return res.status(400).json({ message: 'name is required' });

    const finalPosition = String(position || '').trim();
    if (!finalPosition) return res.status(400).json({ message: 'position is required' });

    // Handle file upload - if new image uploaded, use it; otherwise keep existing
    let finalImageUrl = null;
    if (req.file) {
      finalImageUrl = `/uploads/executive/${req.file.filename}`;
    } else if (req.body.image_url) {
      finalImageUrl = String(req.body.image_url).trim();
    }
    const finalBio = bio ? String(bio).trim() : null;
    const finalStatus = ['draft', 'published'].includes(status) ? status : 'draft';
    const finalOrder = Number(display_order) || 0;

    const result = await new Promise((resolve, reject) => {
      db.query(
        `UPDATE executives SET
          name = ?,
          position = ?,
          image_url = ?,
          bio = ?,
          status = ?,
          display_order = ?,
          updated_at = NOW()
        WHERE id = ?`,
        [finalName, finalPosition, finalImageUrl, finalBio, finalStatus, finalOrder, id],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Executive not found' });
    }

    return res.json({ message: 'Executive updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update executive', error: err.message });
  }
}

// DELETE /api/executives/:id - Delete executive
async function deleteExecutive(req, res) {
  try {
    const { id } = req.params;

    const result = await new Promise((resolve, reject) => {
      db.query('DELETE FROM executives WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Executive not found' });
    }

    return res.json({ message: 'Executive deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete executive', error: err.message });
  }
}

// GET /api/public/executives - Get all published executives (public view)
async function getAllPublishedExecutives(req, res) {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          e.id,
          e.name,
          e.position,
          e.image_url,
          e.bio,
          e.display_order
        FROM executives e
        WHERE e.status = 'published'
        ORDER BY COALESCE(e.display_order, 9999) ASC, e.created_at DESC`,
        [],
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ executives: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch executives', error: err.message });
  }
}

module.exports = {
  getAllExecutives,
  getExecutiveById,
  createExecutive,
  updateExecutive,
  deleteExecutive,
  getAllPublishedExecutives,
};