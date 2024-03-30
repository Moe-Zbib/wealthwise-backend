const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = require("./src/routes/index");
const errorHandler = require("./src/middleware/auth/errorHandler");

app.use(bodyParser.json());
app.use(cors());
app.use("/", router);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = app;
