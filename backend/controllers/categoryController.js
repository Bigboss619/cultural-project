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

// GET /api/categories
async function getAllCategories(req, res) {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(
        'SELECT id, name, slug, description, created_at FROM categories ORDER BY created_at DESC',
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });

    return res.json({ categories: rows || [] });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch categories', error: err.message });
  }
}

// GET /api/categories/:id
async function getCategoryById(req, res) {
  try {
    const { id } = req.params;

    const row = await new Promise((resolve, reject) => {
      db.query(
        'SELECT id, name, slug, description, created_at FROM categories WHERE id = ? LIMIT 1',
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (!row) return res.status(404).json({ message: 'Category not found' });

    return res.json({ category: row });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch category', error: err.message });
  }
}

// POST /api/categories
async function createCategory(req, res) {
  try {
    const { name, description } = req.body || {};

    if (!name || !name.toString().trim()) {
      return res.status(400).json({ message: 'name is required' });
    }

    const finalName = name.toString().trim();
    const slug = slugify(finalName);
    if (!slug) {
      return res.status(400).json({ message: 'slug could not be generated from name' });
    }

    const row = await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO categories (name, slug, description, created_at) VALUES (?, ?, ?, NOW())',
        [finalName, slug, description || ''],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    return res.status(201).json({
      message: 'Category created successfully',
      category: {
        id: row.insertId,
        name: finalName,
        slug,
        description: description || '',
      },
    });
  } catch (err) {
    // handle duplicate slug/name if unique constraint exists
    return res.status(500).json({ message: 'Failed to create category', error: err.message });
  }
}

// PUT /api/categories/:id
async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body || {};

    if (!name || !name.toString().trim()) {
      return res.status(400).json({ message: 'name is required' });
    }

    const finalName = name.toString().trim();
    const slug = slugify(finalName);

    const result = await new Promise((resolve, reject) => {
      db.query(
        'UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?',
        [finalName, slug, description || '', id],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.json({ message: 'Category updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update category', error: err.message });
  }
}

// DELETE /api/categories/:id
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    const result = await new Promise((resolve, reject) => {
      db.query('DELETE FROM categories WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete category', error: err.message });
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

