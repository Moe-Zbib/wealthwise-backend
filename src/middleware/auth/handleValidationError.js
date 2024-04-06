const AppError = require("../../utils/errors/AppError");

const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const isEmpty = (field) => {
  return !field || field.trim().length === 0;
};

const required = () => {
  return `This field is required.`;
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};

  if (!isEmail(email)) {
    errors.email = "Invalid email format";
  }
  if (isEmpty(email)) errors.email = required();
  if (isEmpty(password)) errors.password = required();
  if (Object.keys(errors).length > 0) {
    throw AppError.badRequest(errors);
  }

  next();
};

const validateRegistration = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = {};

  if (!isEmail(email)) next(AppError.badRequest("LALA"));
  if (isEmpty(username)) errors.username = required();
  if (isEmpty(email)) errors.email = required();
  if (isEmpty(password)) errors.password = required();
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  next();
};
const validateForgotPassword = (req, res, next) => {
  const { email } = req.body;
  const errors = {};

  if (!email || email.trim() === "") errors.email = "Email is required";

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    errors.email = "Invalid email format";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = {
  validateLogin,
  validateRegistration,
  validateForgotPassword,
};
