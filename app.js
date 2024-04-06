const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = require("./src/routes/index");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const globalErrorHandler = require("./src/utils/errors/globalErrorHandler");
const port = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(router);

app.use(globalErrorHandler);
app.listen(port, () => {
  console.log("running");
});
