const db = require('../config/config');

// GET /api/testimonials - Get all testimonials (admin view)
async function getAllTestimonials(req, res) {
  try {
    const { status } = req.query || {};

    const whereParts = [];
    const params = [];

    if (status) {
      whereParts.push('t.status = ?');
      params.push(status);
    }

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          t.id,
          t.quote,
          t.name,
          t.title,
          t.image_url,
          t.status,
          t.display_order,
          t.created_at,
          t.updated_at
        FROM testimonials t
        ${whereClause}
        ORDER BY COALESCE(t.display_order, 9999) ASC, t.created_at DESC`,
        params,
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ testimonials: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch testimonials', error: err.message });
  }
}

// GET /api/testimonials/:id - Get testimonial by ID (admin view)
async function getTestimonialById(req, res) {
  try {
    const { id } = req.params;

    const row = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          t.id,
          t.quote,
          t.name,
          t.title,
          t.image_url,
          t.status,
          t.display_order,
          t.created_at,
          t.updated_at
        FROM testimonials t
        WHERE t.id = ?
        LIMIT 1`,
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (!row) return res.status(404).json({ message: 'Testimonial not found' });

    return res.json({ testimonial: row });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch testimonial', error: err.message });
  }
}

// POST /api/testimonials - Create new testimonial
async function createTestimonial(req, res) {
  try {
    const {
      quote,
      name,
      title,
      image_url,
      status = 'draft',
      display_order = 0,
    } = req.body || {};

    const finalQuote = String(quote || '').trim();
    if (!finalQuote) return res.status(400).json({ message: 'quote is required' });

    const finalName = String(name || '').trim();
    if (!finalName) return res.status(400).json({ message: 'name is required' });

    const finalTitle = String(title || '').trim();
    const finalImageUrl = image_url ? String(image_url).trim() : null;
    const finalStatus = ['draft', 'published'].includes(status) ? status : 'draft';
    const finalOrder = Number(display_order) || 0;

    const row = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO testimonials
          (quote, name, title, image_url, status, display_order, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [finalQuote, finalName, finalTitle, finalImageUrl, finalStatus, finalOrder],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    return res.status(201).json({ message: 'Testimonial created successfully', testimonialId: row.insertId });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create testimonial', error: err.message });
  }
}

// PUT /api/testimonials/:id - Update testimonial
async function updateTestimonial(req, res) {
  try {
    const { id } = req.params;

    const {
      quote,
      name,
      title,
      image_url,
      status = 'draft',
      display_order = 0,
    } = req.body || {};

    const finalQuote = String(quote || '').trim();
    if (!finalQuote) return res.status(400).json({ message: 'quote is required' });

    const finalName = String(name || '').trim();
    if (!finalName) return res.status(400).json({ message: 'name is required' });

    const finalTitle = String(title || '').trim();
    const finalImageUrl = image_url ? String(image_url).trim() : null;
    const finalStatus = ['draft', 'published'].includes(status) ? status : 'draft';
    const finalOrder = Number(display_order) || 0;

    const result = await new Promise((resolve, reject) => {
      db.query(
        `UPDATE testimonials SET
          quote = ?,
          name = ?,
          title = ?,
          image_url = ?,
          status = ?,
          display_order = ?,
          updated_at = NOW()
        WHERE id = ?`,
        [finalQuote, finalName, finalTitle, finalImageUrl, finalStatus, finalOrder, id],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    return res.json({ message: 'Testimonial updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update testimonial', error: err.message });
  }
}

// DELETE /api/testimonials/:id - Delete testimonial
async function deleteTestimonial(req, res) {
  try {
    const { id } = req.params;

    const result = await new Promise((resolve, reject) => {
      db.query('DELETE FROM testimonials WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    return res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete testimonial', error: err.message });
  }
}

// GET /api/public/testimonials - Get all published testimonials (public view)
async function getAllPublishedTestimonials(req, res) {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          t.id,
          t.quote,
          t.name,
          t.title,
          t.image_url,
          t.display_order
        FROM testimonials t
        WHERE t.status = 'published'
        ORDER BY COALESCE(t.display_order, 9999) ASC, t.created_at DESC`,
        [],
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ testimonials: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch testimonials', error: err.message });
  }
}

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getAllPublishedTestimonials,
};