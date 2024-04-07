const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../db/models/users.model");
const AppError = require("../utils/errors/AppError");
const UserService = require("./userService");
const EncryptionService = require("./encryptionService");
 
class AuthService {
  async generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
  }

  async login(emailData) {
    const { email, password } = emailData;
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw AppError.BadRequest("Email or password are incorrect");
    }
    const passwordIsValid = await EncryptionService.verifyEncrypt(
      password,
      user.password
    );
    if (!passwordIsValid) {
      throw AppError.BadRequest("Email or password are incorrect");
    }
    const token = await this.generateToken(user.id);
    return token;
  }

  async register(registrationData) {
    const { username, email, password } = registrationData;
    const errors = {};
    const existingEmail = await UserService.getUserByEmail(email);
    const existingUsername = await UserService.getUserByUsername(username);
    if (existingEmail) errors.email = "Email already exists";
    if (existingUsername) errors.username = "Username already exists";
    if (Object.keys(errors).length > 0) {
      throw AppError.BadRequest(errors);
    }
    const hashedPassword = await EncryptionService.setEncrypt(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = await this.generateToken(user.id);
    return token;
  }

  async delete(token)
  {

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
