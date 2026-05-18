const express = require('express');
const db = require('../config/config');

const router = express.Router();

// GET /api/public/posts - Get all published posts for public blog
router.get('/', async (req, res) => {
  try {
    const { category_id } = req.query || {};

    const whereParts = ['p.status = ?'];
    const params = ['published'];

    if (category_id) {
      whereParts.push('p.category_id = ?');
      params.push(category_id);
    }

    const whereClause = `WHERE ${whereParts.join(' AND ')}`;

    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          p.id,
          p.title,
          p.slug,
          p.summary,
          p.content,
          p.featured_image,
          p.featured,
          p.category_id,
          p.created_at,
          c.name AS category
        FROM posts p
        LEFT JOIN categories c ON c.id = p.category_id
        ${whereClause}
        ORDER BY p.created_at DESC`,
        params,
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ posts: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
  }
});

// GET /api/public/posts/featured - Get featured published post
router.get('/featured', async (req, res) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          p.id,
          p.title,
          p.slug,
          p.summary,
          p.content,
          p.featured_image,
          p.featured,
          p.category_id,
          p.created_at,
          c.name AS category
        FROM posts p
        LEFT JOIN categories c ON c.id = p.category_id
        WHERE p.status = 'published' AND p.featured = 1
        ORDER BY p.created_at DESC
        LIMIT 1`,
        [],
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ post: rows[0] || null });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch featured post', error: err.message });
  }
});

// GET /api/public/posts/slug/:slug - Get post by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const row = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          p.id,
          p.title,
          p.slug,
          p.summary,
          p.content,
          p.featured_image,
          p.featured,
          p.category_id,
          p.user_id,
          p.status,
          p.created_at,
          p.updated_at,
          c.name AS category
        FROM posts p
        LEFT JOIN categories c ON c.id = p.category_id
        WHERE p.slug = ? AND p.status = 'published'
        LIMIT 1`,
        [slug],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (!row) return res.status(404).json({ message: 'Post not found' });

    return res.json({ post: row });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch post', error: err.message });
  }
});

// GET /api/public/posts/:id - Get post by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const row = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          p.id,
          p.title,
          p.slug,
          p.summary,
          p.content,
          p.featured_image,
          p.featured,
          p.category_id,
          p.user_id,
          p.status,
          p.created_at,
          p.updated_at,
          c.name AS category
        FROM posts p
        LEFT JOIN categories c ON c.id = p.category_id
        WHERE p.id = ? AND p.status = 'published'
        LIMIT 1`,
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (!row) return res.status(404).json({ message: 'Post not found' });

    return res.json({ post: row });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch post', error: err.message });
  }
});

module.exports = router;