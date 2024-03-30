const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
  handler: function (req, res /*, next */) {
    res.status(429).json({
      error:
        "Too many login attempts from this IP, please try again after 15 minutes",
    });
  },
});

const registrationRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 3,
  message:
    "Too many accounts created from this IP, please try again after an hour",
  handler: function (req, res) {
    res.status(429).json({
      error:
        "Too many accounts created from this IP, please try again after an hour",
    });
  },
});

const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
  handler: function (req, res /*, next */) {
    res.status(429).json({
      error:
        "Too many requests from this IP, please try again after 15 minutes",
    });
  },
});

module.exports = {
  loginRateLimiter,
  generalRateLimiter,
  registrationRateLimiter,
};
