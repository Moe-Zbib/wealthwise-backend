const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors package
const app = express();
const router = require("./src/routes/index");

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
