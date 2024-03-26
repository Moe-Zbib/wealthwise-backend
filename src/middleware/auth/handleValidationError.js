const handleValidationError = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({ error: "Email and data are required." });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Data must be at least 8 characters long." });
  }

  next();
};

module.exports = { handleValidationError };
