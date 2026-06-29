const rateLimit = require('express-rate-limit');

exports.contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    success: false,
    message: 'Too many messages sent. Please wait before trying again.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    message: 'Too many login attempts. Please wait 15 minutes.'
  }
});
