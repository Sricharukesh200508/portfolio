const express = require('express');
const router = express.Router();
const { getCertifications, createCertification, updateCertification, deleteCertification } = require('../controllers/certController');
const protect = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getCertifications);
router.post('/', protect, upload.single('image'), createCertification);
router.put('/:id', protect, upload.single('image'), updateCertification);
router.delete('/:id', protect, deleteCertification);

module.exports = router;
