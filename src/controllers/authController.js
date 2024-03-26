const authService = require("../services/authService");
const User = require("../models/users.model");
const handleValidationError = require("../middleware/auth/errorHandler");
const errorHandler = require("../middleware/auth/errorHandler");
const { tryCatch } = require("../utils/tryCatch");

exports.login = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }] });
  if (!existingUser) {
    throw new Error("Email or password are incorrect!");
  }

  const token = await authService.login(email, password);
  res.status(200).json({ token });
});

exports.register = tryCatch(async (req, res) => {
  const { username, email } = req.body;
  const existingEmail = await User.findOne({ $or: [{ username }] });
  const user = await authService.register(req.body);
  res.status(201).json({ message: "Registered successfully", user });
});

// exports.checkEmail = async (req, res) => {
//   try {
//     const email = req.params.email;
//     const user = await User.findOne({ email });
//     res.json({ exists: !!user });
//   } catch (e) {
//     res.status(500).json({ error: "Unexpected Error" });
//   }
// };
