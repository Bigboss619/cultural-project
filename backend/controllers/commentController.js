const db = require('../config/config');

// GET /api/comments - Get all comments (admin)
async function getAllComments(req, res) {
  try {
    const { approved, post_id } = req.query || {};

    const whereParts = [];
    const params = [];

    if (approved !== undefined) {
      whereParts.push('c.approved = ?');
      params.push(approved === 'true' ? 1 : 0);
    }

    if (post_id) {
      whereParts.push('c.post_id = ?');
      params.push(post_id);
    }

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          c.id,
          c.post_id,
          c.author_name,
          c.author_email,
          c.content,
          c.approved,
          c.created_at,
          p.title AS post_title,
          p.slug AS post_slug
        FROM comments c
        LEFT JOIN posts p ON p.id = c.post_id
        ${whereClause}
        ORDER BY c.created_at DESC`,
        params,
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ comments: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
  }
}

// PATCH /api/comments/:id/approve - Approve/reject a comment
async function moderateComment(req, res) {
  try {
    const { id } = req.params;
    const { approved } = req.body || {};

    if (approved === undefined) {
      return res.status(400).json({ message: 'approved field is required' });
    }

    const result = await new Promise((resolve, reject) => {
      db.query(
        'UPDATE comments SET approved = ? WHERE id = ?',
        [approved ? 1 : 0, id],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    return res.json({ message: 'Comment updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to moderate comment', error: err.message });
  }
}

// DELETE /api/comments/:id - Delete a comment
async function deleteComment(req, res) {
  try {
    const { id } = req.params;

    const result = await new Promise((resolve, reject) => {
      db.query('DELETE FROM comments WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    return res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete comment', error: err.message });
  }
}

// POST /api/public/comments - Create a comment (public)
async function createComment(req, res) {
  try {
    const { post_id, author_name, author_email, content } = req.body || {};

    if (!post_id) return res.status(400).json({ message: 'post_id is required' });
    if (!author_name || !author_name.trim()) return res.status(400).json({ message: 'author_name is required' });
    if (!author_email || !author_email.trim()) return res.status(400).json({ message: 'author_email is required' });
    if (!content || !content.trim()) return res.status(400).json({ message: 'content is required' });

    const result = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO comments (post_id, author_name, author_email, content, approved, created_at)
         VALUES (?, ?, ?, ?, 0, NOW())`,
        [post_id, author_name.trim(), author_email.trim(), content.trim()],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    return res.status(201).json({ message: 'Comment submitted successfully', commentId: result.insertId });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to submit comment', error: err.message });
  }
}

// GET /api/public/comments/:postId - Get approved comments for a post (public)
async function getApprovedComments(req, res) {
  try {
    const { postId } = req.params;

    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT id, author_name, content, created_at
         FROM comments
         WHERE post_id = ? AND approved = 1
         ORDER BY created_at ASC`,
        [postId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    return res.json({ comments: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
  }
}

module.exports = {
  getAllComments,
  moderateComment,
  deleteComment,
  createComment,
  getApprovedComments,
};