const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} = require('../controllers/memberController');

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// GET /api/members - Get all members
router.get('/', getAllMembers);

// GET /api/members/:id - Get member by ID
router.get('/:id', getMemberById);

// POST /api/members - Create new member (with image upload)
router.post('/', upload.single('image'), createMember);

// PUT /api/members/:id - Update member (with image upload)
router.put('/:id', upload.single('image'), updateMember);

// PATCH /api/members/:id - Partial update member (with image upload)
router.patch('/:id', upload.single('image'), updateMember);

// DELETE /api/members/:id - Delete member
router.delete('/:id', deleteMember);

module.exports = router;