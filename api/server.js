const express = require('express');
const cors = require('cors');

// Create a fresh Express app inside the serverless function
const app = express();
app.use(cors());
app.use(express.json());

// Mount the existing router setup from backend/server.js would normally require refactor.
// Instead, we re-create the same behavior by requiring your backend server module
// and exporting the configured Express app.
//
// For this to work, backend/server.js must export the Express `app` instead of calling app.listen.
// We attempt to require it and use its exported app.

let exported;
try {
  exported = require('../backend/server');
} catch (e) {
  // If server.js still starts listening, Vercel will not reach this handler.
  // We'll return a helpful response.
  return module.exports = async (req, res) => {
    res.status(500).send('Failed to load backend/server.js. Ensure it exports the Express app.');
  };
}

const configuredApp = exported && exported.app ? exported.app : exported;

// If backend/server.js exports an Express app, wire it up.
if (configuredApp && typeof configuredApp.handle === 'function') {
  module.exports = async (req, res) => {
    return configuredApp.handle(req, res);
  };
} else {
  module.exports = async (req, res) => {
    res.status(500).send('backend/server.js did not export an Express app. Please update server.js to export { app }.');
  };
}

