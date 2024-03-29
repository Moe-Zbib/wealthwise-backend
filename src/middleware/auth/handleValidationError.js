const validateRegistration = (req, res, next) => {
  const { username, email, password, firstName, lastName } = req.body;
  const errors = {};

  if (!username || username.trim() === "")
    errors.username = "Username is required";
  if (!email || email.trim() === "") errors.email = "Email is required";
  if (!password || password.trim() === "")
    errors.password = "Password is required";
  if (!firstName || firstName.trim() === "")
    errors.firstName = "First name is required";
  if (!lastName || lastName.trim() === "")
    errors.lastName = "Last name is required";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};

  if (!email || email.trim() === "") errors.email = "Email is required";
  if (!password || password.trim() === "")
    errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { validateLogin, validateRegistration };
