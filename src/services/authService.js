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
  console.log(" the data being passed:", registrationData);
  const { name, lastName, username, email, password } = registrationData;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    const field = existingUser.username === username ? "username" : "email";
    throw new Error(`${field} already exists.`);
  }

  const { hashedData } = await hashData(password);
  const user = await User.create({
    username,
    email,
    password: hashedData,
    firstname: name,
    lastname: lastName,
  });

  console.log("added to database!");
  return user;
};
