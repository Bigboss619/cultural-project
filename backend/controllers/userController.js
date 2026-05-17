const db = require('../config/config');

// GET /api/users
// Expected auth middleware: req.user = { userId, email, role }
async function getAllUsers(req, res) {
  try {
    // Optional: admin-only restriction (uncomment if desired)
    // if (req.user?.role !== 'Admin') {
    //   return res.status(403).json({ message: 'Forbidden' });
    // }

    const { role } = req.query;

    // Default: editor/member only
    const whereClause = role
      ? 'role = ?'
      : 'role IN (?, ?)';

    const params = role
      ? [role]
      : ['editor', 'member'];


    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT id, name, email, role, status FROM users WHERE ${whereClause}`,
        params,
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });


    return res.json({
      users: rows || []
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch users',
      error: err.message
    });
  }
}

module.exports = { getAllUsers };

