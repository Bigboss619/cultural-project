const express = require('express');
const {
  createComment,
  getApprovedComments,
} = require('../controllers/commentController');

const router = express.Router();

router.post('/', createComment);
router.get('/:postId', getApprovedComments);

module.exports = router;