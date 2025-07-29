// Import - default
const rateLimit = require('express-rate-limit');

// Define the rate limiter middleware
const emailRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

module.exports = {
  emailRateLimiter
}