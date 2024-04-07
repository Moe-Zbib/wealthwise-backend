const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../db/models/users.model");
const AppError = require("../utils/errors/AppError");
const UserService = require("./userService");

class AuthService {
  async verifyPassword(enteredPassword, userPassword) {
    return bcrypt.compare(enteredPassword, userPassword);
  }

  async generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
  }

  async loginService(emailData) {
    const { email, password } = emailData;
    console.log(email, password, "this are the data");
    const user = await UserService.getUserByEmail(email);
    const passwordIsValid = await this.verifyPassword(password, user.password);
    if (!passwordIsValid || !user) {
      throw AppError.BadRequest("Email or password are incorrect");
    }
    return user;
  }

  async register(registrationData) {
    const { username, email, password } = registrationData;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = await this.generateToken(user._id);
    return token;
  }

  generatePasswordResetToken(userId) {
    const token = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1hr",
    });

    return token;
  }

  verifyPasswordResetToken(token) {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  }
}

module.exports = new AuthService();
