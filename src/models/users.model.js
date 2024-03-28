// users.model.js
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      unique: false,
    },
    lastName: {
      type: String,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
