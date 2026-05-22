const express = require('express');
const { getAllPublishedMembers } = require('../controllers/memberController');

const router = express.Router();

// GET /api/public/members - Get all published members
router.get('/', getAllPublishedMembers);

module.exports = router;