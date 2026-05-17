const express = require('express');

const { requireAuth } = require('../middleware/authMiddleware');
const { getAllUsers } = require('../controllers/userController');

const router = express.Router();

// GET /api/users - fetch all users (admin dashboard)
router.get('/', requireAuth, getAllUsers);

module.exports = router;

