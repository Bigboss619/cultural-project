const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/config');

function signToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

// POST /api/auth/register
async function register(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }


    const existing = await new Promise((resolve, reject) => {
      db.query('SELECT id, email FROM users WHERE email = ?', [email], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const finalName = name || null;

    const result = await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [finalName, email, passwordHash],
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    return res.status(201).json({
      message: 'Registered successfully',
      user: { id: result.insertId, email }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
}

// POST /api/auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const rows = await new Promise((resolve, reject) => {
      db.query('SELECT id, email, password, role FROM users WHERE email = ?', [email], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);

    return res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
}

// GET /api/auth/profile
async function getProfile(req, res) {
  try {
    // requireAuth will populate req.user
    const { userId } = req.user || {};
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const rows = await new Promise((resolve, reject) => {
      db.query('SELECT id, name, email, role, phone, bio, created_at FROM users WHERE id = ?', [userId], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

    return res.json({ user: rows[0] });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
}

// PUT /api/auth/profile
async function updateProfile(req, res) {
  try {
    const { userId } = req.user || {};
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { name, phone, bio } = req.body || {};

    const updates = [];
    const params = [];

    if (name !== undefined) {
      updates.push('name = ?');
      params.push(name || null);
    }

    if (phone !== undefined) {
      updates.push('phone = ?');
      params.push(phone || null);
    }

    if (bio !== undefined) {
      updates.push('bio = ?');
      params.push(bio || null);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    params.push(userId);

    await new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
        params,
        (err, r) => {
          if (err) return reject(err);
          resolve(r);
        }
      );
    });

    // Fetch updated user
    const rows = await new Promise((resolve, reject) => {
      db.query('SELECT id, name, email, role, phone, bio, created_at FROM users WHERE id = ?', [userId], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    return res.json({ message: 'Profile updated successfully', user: rows[0] });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
}

// PUT /api/auth/change-password
async function changePassword(req, res) {
  try {
    const { userId } = req.user || {};
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { currentPassword, newPassword } = req.body || {};

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'currentPassword and newPassword are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    // Get current password hash
    const rows = await new Promise((resolve, reject) => {
      db.query('SELECT password FROM users WHERE id = ?', [userId], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = rows[0];
    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await new Promise((resolve, reject) => {
      db.query('UPDATE users SET password = ? WHERE id = ?', [newHash, userId], (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    return res.json({ message: 'Password changed successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to change password', error: err.message });
  }
}

module.exports = { register, login, getProfile, updateProfile, changePassword };

