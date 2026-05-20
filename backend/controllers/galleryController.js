const db = require('../config/config');
const fs = require('fs');
const path = require('path');

// GET /api/gallery - Get all gallery items (admin view)
async function getAllGalleryItems(req, res) {
  try {
    const { status, category } = req.query || {};

    const whereParts = [];
    const params = [];

    if (status) {
      whereParts.push('g.status = ?');
      params.push(status);
    }
    if (category) {
      whereParts.push('g.category = ?');
      params.push(category);
    }

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          g.id,
          g.title,
          g.category,
          g.caption,
          g.image_url,
          g.display_order,
          g.status,
          g.created_at,
          g.updated_at
        FROM gallery g
        ${whereClause}
        ORDER BY COALESCE(g.display_order, 9999) ASC, g.created_at DESC`,
        params,
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ gallery: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch gallery items', error: err.message });
  }
}

// GET /api/gallery/:id - Get gallery item by ID (admin view)
async function getGalleryItemById(req, res) {
  try {
    const { id } = req.params;

    const row = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          g.id,
          g.title,
          g.category,
          g.caption,
          g.image_url,
          g.display_order,
          g.status,
          g.created_at,
          g.updated_at
        FROM gallery g
        WHERE g.id = ?
        LIMIT 1`,
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (!row) return res.status(404).json({ message: 'Gallery item not found' });

    return res.json({ galleryItem: row });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch gallery item', error: err.message });
  }
}

// POST /api/gallery - Create new gallery item
async function createGalleryItem(req, res) {
  try {
    const {
      title,
      category,
      caption,
      status = 'draft',
      display_order = 0,
    } = req.body || {};

    const finalTitle = String(title || '').trim();
    if (!finalTitle) return res.status(400).json({ message: 'title is required' });

    const finalCategory = String(category || '').trim();
    if (!finalCategory) return res.status(400).json({ message: 'category is required' });

    // Handle file upload - multer puts info in req.file
    const finalImageUrl = req.file ? `/uploads/gallery/${req.file.filename}` : null;
    if (!finalImageUrl) return res.status(400).json({ message: 'image is required' });

    const finalCaption = caption ? String(caption).trim() : null;
    const finalStatus = ['draft', 'published'].includes(status) ? status : 'draft';
    const finalOrder = Number(display_order) || 0;

    const row = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO gallery
          (title, category, caption, image_url, status, display_order, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [finalTitle, finalCategory, finalCaption, finalImageUrl, finalStatus, finalOrder],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    return res.status(201).json({ message: 'Gallery item created successfully', galleryId: row.insertId });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create gallery item', error: err.message });
  }
}

// PUT /api/gallery/:id - Update gallery item
async function updateGalleryItem(req, res) {
  try {
    const { id } = req.params;

    const {
      title,
      category,
      caption,
      status = 'draft',
      display_order = 0,
    } = req.body || {};

    const finalTitle = String(title || '').trim();
    if (!finalTitle) return res.status(400).json({ message: 'title is required' });

    const finalCategory = String(category || '').trim();
    if (!finalCategory) return res.status(400).json({ message: 'category is required' });

    // Handle file upload - if new image uploaded, use it; otherwise keep existing
    let finalImageUrl = null;
    if (req.file) {
      finalImageUrl = `/uploads/gallery/${req.file.filename}`;
    } else if (req.body.image_url) {
      finalImageUrl = String(req.body.image_url).trim();
    }

    const finalCaption = caption ? String(caption).trim() : null;
    const finalStatus = ['draft', 'published'].includes(status) ? status : 'draft';
    const finalOrder = Number(display_order) || 0;

    const result = await new Promise((resolve, reject) => {
      db.query(
        `UPDATE gallery SET
          title = ?,
          category = ?,
          caption = ?,
          image_url = ?,
          status = ?,
          display_order = ?,
          updated_at = NOW()
        WHERE id = ?`,
        [finalTitle, finalCategory, finalCaption, finalImageUrl, finalStatus, finalOrder, id],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    return res.json({ message: 'Gallery item updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update gallery item', error: err.message });
  }
}

// DELETE /api/gallery/:id - Delete gallery item
async function deleteGalleryItem(req, res) {
  try {
    const { id } = req.params;

    // Fetch the gallery item first to get the image_url
    const row = await new Promise((resolve, reject) => {
      db.query('SELECT image_url FROM gallery WHERE id = ? LIMIT 1', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results && results[0] ? results[0] : null);
      });
    });

    if (!row) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Delete the image file if it exists
    if (row.image_url) {
      const imagePath = path.join(__dirname, '..', row.image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the gallery record
    const result = await new Promise((resolve, reject) => {
      db.query('DELETE FROM gallery WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    return res.json({ message: 'Gallery item deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete gallery item', error: err.message });
  }
}

// GET /api/public/gallery - Get all published gallery items (public view)
async function getAllPublishedGalleryItems(req, res) {
  try {
    const { category } = req.query || {};

    const whereParts = ['g.status = \'published\''];
    const params = [];

    if (category) {
      whereParts.push('g.category = ?');
      params.push(category);
    }

    const whereClause = `WHERE ${whereParts.join(' AND ')}`;

    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          g.id,
          g.title,
          g.category,
          g.caption,
          g.image_url,
          g.display_order
        FROM gallery g
        ${whereClause}
        ORDER BY COALESCE(g.display_order, 9999) ASC, g.created_at DESC`,
        params,
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ gallery: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch gallery items', error: err.message });
  }
}

module.exports = {
  getAllGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getAllPublishedGalleryItems,
};