const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const PasswordResetToken = sequelize.define("PasswordResetToken", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expiryDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = PasswordResetToken;
