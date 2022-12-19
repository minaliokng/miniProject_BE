const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 1 * 1000,
  max: 5,
  message: '요청이 너무 많아요...',
});

module.exports = rateLimiter;
