const db = require('../config/config');

function slugify(input) {
  return (input || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function toNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

// GET /api/posts
async function getAllPosts(req, res) {
  try {
    const { status, category_id } = req.query || {};

    const whereParts = [];
    const params = [];

    if (status) {
      whereParts.push('p.status = ?');
      params.push(status);
    }

    if (category_id) {
      whereParts.push('p.category_id = ?');
      params.push(category_id);
    }

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          p.id,
          p.title,
          p.slug,
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
}

// GET /api/posts/:id
async function getPostById(req, res) {
  try {
    const { id } = req.params;

    const row = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          p.id,
          p.title,
          p.slug,
          p.content,
          p.featured_image,
          p.category_id,
          p.user_id,
          p.status,
          p.created_at,
          p.updated_at,
          c.name AS category
        FROM posts p
        LEFT JOIN categories c ON c.id = p.category_id
        WHERE p.id = ?
        LIMIT 1`,
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (!row) return res.status(404).json({ message: 'Post not found' });

    // derive summary for frontend compatibility
    const summary = row.content ? String(row.content).slice(0, 160) : '';

    return res.json({ post: { ...row, summary } });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch post', error: err.message });
  }
}

// POST /api/posts
async function createPost(req, res) {
  try {
    const {
      title,
      content,
      featured_image,
      category_id,
      status = 'draft',
    } = req.body || {};

    const finalTitle = String(title || '').trim();
    if (!finalTitle) return res.status(400).json({ message: 'title is required' });

    const finalSlug = slugify(finalTitle);
    if (!finalSlug) return res.status(400).json({ message: 'slug could not be generated from title' });

    const finalCategoryId = toNum(category_id);
    if (!finalCategoryId) return res.status(400).json({ message: 'category_id is required' });

    const finalStatus = ['draft', 'published'].includes(status) ? status : 'draft';

    const finalContent = String(content || '').trim();
    const finalFeaturedImage = featured_image ? String(featured_image) : null;

    const userId = req.user?.userId || req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const row = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO posts
          (title, slug, content, featured_image, featured, category_id, user_id, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [finalTitle, finalSlug, finalContent, finalFeaturedImage, status === 'published' ? (featured ? 1 : 0) : 0, finalCategoryId, userId, finalStatus],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    return res.status(201).json({ message: 'Post created successfully', postId: row.insertId });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
}

// PUT /api/posts/:id
async function updatePost(req, res) {
  try {
    const { id } = req.params;

    const {
      title,
      content,
      featured_image,
      category_id,
      status = 'draft',
      featured,
    } = req.body || {};

    const finalTitle = String(title || '').trim();
    if (!finalTitle) return res.status(400).json({ message: 'title is required' });

    const finalSlug = slugify(finalTitle);
    if (!finalSlug) return res.status(400).json({ message: 'slug could not be generated from title' });

    const finalCategoryId = toNum(category_id);
    if (!finalCategoryId) return res.status(400).json({ message: 'category_id is required' });

    const finalContent = String(content || '').trim();
    const finalFeaturedImage = featured_image ? String(featured_image) : null;

    const finalStatus = ['draft', 'published'].includes(status) ? status : 'draft';

    const finalFeatured = finalStatus === 'published' ? (featured ? 1 : 0) : 0;

    const result = await new Promise((resolve, reject) => {

      db.query(
        `UPDATE posts
         SET
           title = ?,
           slug = ?,
           content = ?,
           featured_image = ?,
           featured = ?,
           category_id = ?,
           status = ?

         WHERE id = ?`,
        [finalTitle, finalSlug, finalContent, finalFeaturedImage, finalFeatured, finalCategoryId, finalStatus, id],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.json({ message: 'Post updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update post', error: err.message });
  }
}

// DELETE /api/posts/:id
async function deletePost(req, res) {
  try {
    const { id } = req.params;

    const result = await new Promise((resolve, reject) => {
      db.query('DELETE FROM posts WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete post', error: err.message });
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};

