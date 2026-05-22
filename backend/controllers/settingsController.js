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
    // req.files when using upload.fields() is an object like { hero_image: [files], about_image: [files] }
    const filesObj = req.files || {};
    const textKeys = Object.keys(req.body || {});

    // Keys that have file uploads
    const fileFieldNames = Object.keys(filesObj);

    // Combine all unique text keys and file field names
    const allKeys = [...new Set([...textKeys, ...fileFieldNames])];

    for (const key of allKeys) {
      // Check if this key has a file upload
      if (filesObj[key] && filesObj[key].length > 0) {
        const file = filesObj[key][0]; // Get first file for this field

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

      // Regular text update
      const value = req.body[key];
      if (value !== undefined && value !== null) {
        await new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)
             ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_at = NOW()`,
            [key, String(value)],
            (err) => {
              if (err) return reject(err);
              resolve();
            }
          );
        });
      }
    }

    return res.json({ message: 'Settings updated successfully' });
  } catch (err) {
    console.error('Update settings error:', err);
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