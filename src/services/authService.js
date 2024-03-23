const { hashData } = require("./encryptionService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const User = require("../models/users.model");

exports.login = async (email, data, pepper) => {
  console.log(email);
};

exports.register = async (email, password) => {
  const { hashedData, pepper } = await hashData(password);

  const user = await User.create({ email, password });
  console.log("Created", user);
};
