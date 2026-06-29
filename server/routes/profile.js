const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const protect = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getProfile);
router.patch('/', protect, upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), updateProfile);

module.exports = router;
