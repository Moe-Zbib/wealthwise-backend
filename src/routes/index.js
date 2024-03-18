const express = require("express");
const authRoutes = require("./authRoute"); // Import your authentication routes
// Add other route imports as needed

const mainRouter = express.Router();

mainRouter.use("/auth", authRoutes);

module.exports = mainRouter;
