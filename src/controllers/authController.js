const authService = require("../services/authService");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login." });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  authService.register(email, password);

  res.status(201).send();
};
