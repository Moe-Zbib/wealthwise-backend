const { hashData } = require("./encryptionService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const User = require("../models/users.model");

exports.login = async (email, data, pepper) => {
  console.log(email);
};

exports.register = async (registrationData) => {
  const { firstname, lastname, username, email, password } = registrationData;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const error = {};
      if (existingUser.username === username) {
        error.username = "Username already exists";
      }
      if (existingUser.email === email) {
        error.email = "Email already exists";
      }
      throw error;
    }

    const { hashedData } = await hashData(password);
    const user = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedData,
    });
    return user;
  } catch (e) {
    throw e;
  }
};
