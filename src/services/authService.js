const { hashData } = require("./encryptionService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const User = require("../db/models/users.model");
const bcrypt = require("bcrypt");

exports.verifyPassword = async (enteredPassword, userPassword) => {
  return bcrypt.compare(enteredPassword, userPassword);
};

exports.generateToken = async (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

exports.register = async (registrationData) => {
  const { username, email, password } = registrationData;

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  return user;
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
