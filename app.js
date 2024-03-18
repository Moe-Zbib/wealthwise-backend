const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./src/routes/index");

app.use(bodyParser.json());

app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
