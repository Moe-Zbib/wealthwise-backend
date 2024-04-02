const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = require("./src/routes/index");
const errorHandler = require("./src/middleware/auth/errorHandler");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);  

app.use("/", router);
app.use(errorHandler);
app.use(cookieParser());
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = app;
