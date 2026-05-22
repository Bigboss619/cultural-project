const db = require('../config/config');
const fs = require('fs');
const path = require('path');

// GET /api/settings - Get all settings (admin view)
async function getAllSettings(req, res) {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT setting_key, setting_value FROM settings ORDER BY setting_key`,
        [],
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    // Convert array to key-value object
    const settings = {};
    rows.forEach(row => {
      settings[row.setting_key] = row.setting_value;
    });

    return res.json({ settings });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch settings', error: err.message });
  }
}

// PUT /api/settings - Update multiple settings
async function updateSettings(req, res) {
  try {
    const { settings } = req.body || {};

    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ message: 'settings object is required' });
    }

    const keys = Object.keys(settings);

    for (const key of keys) {
      const value = settings[key];

      // Handle image uploads specially
      if (req.files) {
        const file = req.files.find(f => f.fieldname === key);
        if (file) {
          // Delete old image if exists
          const old = await new Promise((resolve, reject) => {
            db.query('SELECT setting_value FROM settings WHERE setting_key = ?', [key], (err, results) => {
              if (err) return reject(err);
              resolve(results && results[0] ? results[0] : null);
            });
          });

          if (old && old.setting_value) {
            const oldPath = path.resolve(__dirname, '..', old.setting_value.replace(/^\//, ''));
            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
            }
          }

          // Insert/update with new file path
          const newValue = `/uploads/settings/${file.filename}`;
          await new Promise((resolve, reject) => {
            db.query(
              `INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)
               ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_at = NOW()`,
              [key, newValue],
              (err) => {
                if (err) return reject(err);
                resolve();
              }
            );
          });
          continue;
        }
      }

      // Regular text update
      await new Promise((resolve, reject) => {
        db.query(
          `INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)
           ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_at = NOW()`,
          [key, value],
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });
    }

    return res.json({ message: 'Settings updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update settings', error: err.message });
  }
}

// GET /api/public/settings - Get public settings only
async function getPublicSettings(req, res) {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT setting_key, setting_value FROM settings ORDER BY setting_key`,
        [],
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    const settings = {};
    rows.forEach(row => {
      settings[row.setting_key] = row.setting_value;
    });

    return res.json({ settings });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch settings', error: err.message });
  }
}

module.exports = {
  getAllSettings,
  updateSettings,
  getPublicSettings,
};