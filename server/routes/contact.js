const express = require('express');
const router = express.Router();
const { submitContact, getMessages, markRead, deleteMessage, clearAll } = require('../controllers/contactController');
const protect = require('../middleware/auth');
const { contactLimiter } = require('../middleware/rateLimiter');

// Public
router.post('/', contactLimiter, submitContact);

// Protected
router.get('/messages', protect, getMessages);
router.patch('/messages/:id/read', protect, markRead);
router.delete('/messages/clear-all', protect, clearAll);
router.delete('/messages/:id', protect, deleteMessage);

module.exports = router;
