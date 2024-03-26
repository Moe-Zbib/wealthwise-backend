const express = require("express");
const cors = require("cors"); // Import cors package
const bodyParser = require("body-parser");
const app = express();
const router = require("./src/routes/index");
const mongoose = require("mongoose");
const errorHandler = require("./src/middleware/auth/errorHandler");

app.use(bodyParser.json());
app.use(cors());
app.use("/", router);
app.use(errorHandler);
const port = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://mohammadhzbib:mRH2m5IYOd7hrILG@expressbackend.nxwf3o3.mongodb.net/?retryWrites=true&w=majority&appName=ExpressBackend"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port} and ready `);
    });
  })
  .catch((e) => {
    console.log("Error", e);
  });
