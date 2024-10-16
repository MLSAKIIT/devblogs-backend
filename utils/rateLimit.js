import rateLimit from 'express-rate-limit';

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour window
const RATE_LIMIT_MAX_REQUESTS = 100 // limit each IP to 100 requests per windowMs

export default rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS, 
  max: RATE_LIMIT_MAX_REQUESTS, 
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => { 
    res.status(429).json({
      message: "Too many requests, please try again later.",
    });
  },
});