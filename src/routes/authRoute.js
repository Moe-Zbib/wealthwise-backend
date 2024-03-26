const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  handleValidationError,
} = require("../middleware/auth/handleValidationError");

router.post("/login", handleValidationError, authController.login);
router.post("/register", handleValidationError, authController.register);

module.exports = router;
