const authService = require("../services/authService");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    await authService.register(email, password);
    res.status(201).send();
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ error: error.message });
  }
};
