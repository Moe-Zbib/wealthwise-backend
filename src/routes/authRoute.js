const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const rateLimit = require("../utils/rateLimit");
const {
  validateLogin,
  validateRegistration,
  validateForgotPassword,
} = require("../middleware/auth/handleValidationError");

router.post(
  "/login",
  validateLogin,
  rateLimit.loginRateLimiter,
  authController.login
);

router.post(
  "/register",
  validateRegistration,
  rateLimit.registrationRateLimiter,
  authController.register
);

// router.post(
//   "/forgot-password",
//   validateForgotPassword,
//   authController.forgotPassword
// );
// router.post("/reset-password:token", authController.resetPassword);

module.exports = router;
