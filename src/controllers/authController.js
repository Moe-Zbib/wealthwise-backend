const authService = require("../services/authService");
const User = require("../db/models/users.model");
const { tryCatch } = require("../utils/tryCatch");

/////////////////////////////////////////////////////////////////////////////////////

exports.login = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (
    !existingUser ||
    !(await authService.verifyPassword(password, existingUser.password))
  ) {
    return res.status(401).json({ error: "Email or password is incorrect!" });
  }

  const token = await authService.generateToken(existingUser._id);
  res.status(200).json({ token });
});

/////////////////////////////////////////////////////////////////////////////////////

exports.register = tryCatch(async (req, res) => {
  const { email, username } = req.body;
  const errors = {};

  const existingEmail = await User.findOne({ where: { email } });
  const existingUsername = await User.findOne({ where: { username } });

  if (existingEmail) errors.email = "Email already exists";
  if (existingUsername) errors.username = "Username already exists";

  if (Object.keys(errors).length > 0) {
    return res.status(409).json({ errors });
  }
  const user = await authService.register(req.body);
  res.status(201).json({ message: "User Registered", user });
});

//////////////////////////////////////////////////////////////////////////////////////

exports.forgotPassword = tryCatch(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: " User not found!" });
  }

  const token = await authService.generatePasswordResetToken(user.id);
  res.status(200).json({ message: "Password reset email sent ", token });
});

exports.resetPassword = tryCatch(async (req, res) => {
  const { token, newPassword } = req.body;
  const userId = await authService.verifyPasswordResetToken(token);
  if (!userId) {
    return res.status(400).json({ error: "  Invalid or expired token!" });
  }

  const user = await User.findOne({ where: { _id: userId } });
  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  const hashedPassword = await authService.hashedPassword(newPassword);
  await user.update({ password: hashedPassword });

  res.status(200).json({ message: " Password has been reset." });
});
