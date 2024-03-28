const authService = require("../services/authService");
const User = require("../models/users.model");
const handleValidationError = require("../middleware/auth/errorHandler");
const errorHandler = require("../middleware/auth/errorHandler");
const { tryCatch } = require("../utils/tryCatch");

exports.login = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (
    !existingUser ||
    !(await authService.verifyPassword(password, existingUser.password))
  ) {
    return res.status(401).json({ error: "Email or password is incorrect!" });
  }

  const token = await authService.generateToken(existingUser._id);
  res.status(200).json({ token });
});

exports.register = tryCatch(async (req, res) => {
  const { email, username } = req.body;
  const errors = {};

  const existingEmail = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });

  if (existingEmail) errors.email = "Email already exists";
  if (existingUsername) errors.username = "Username already exists";

  if (Object.keys(errors).length > 0) {
    return res.status(409).json({ errors });
  }
  const user = await authService.register(req.body);
  res.status(201).json({ message: "User Registered", user });
});
