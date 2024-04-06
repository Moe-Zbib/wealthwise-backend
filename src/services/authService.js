const { hashData } = require("./encryptionService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const User = require("../db/models/users.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const AppError = require("../utils/errors/AppError");
const { log } = require("console");

exports.verifyPassword = async (enteredPassword, userPassword) => {
  return bcrypt.compare(enteredPassword, userPassword);
};

exports.generateToken = async (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

/////////////////////////////////////////////////////////////////////////////////////////

async function loginService(username, password) {
  // const user  await findUserByUsername(username); // Assuming this function checks the DB
  if (true) {
    throw AppError.BadRequest({ email: "its wrong man", passowrd: " me too" });
  }

  const passwordIsValid = await verifyPassword(password, user.password); // Verify the password
  if (!passwordIsValid) {
    throw new AppError("Invalid password", "authentication_error", 401);
  }

  // Proceed with login logic...
  return user; // Or token, or any other relevant info
}

/////////////////////////////////////////////////////////////////////////////////////////

exports.register = async (registrationData) => {
  const { username, email, password } = registrationData;

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  const token = await this.generateToken(user);
  return token;
};

exports.generatePasswordResetToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });

  return token;
};

exports.verifyPasswordResetToken = (token) => {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decoded;
};

module.exports = loginService;
