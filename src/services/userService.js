const { getTestMessageUrl } = require("nodemailer");
const User = require("../db/models/users.model");

class UserService {
  async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async getUserByUsername(username) {
    return await User.findOne({ where: { username } });
  }
}

module.exports = new UserService();
