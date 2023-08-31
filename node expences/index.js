const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");

app.use(cors());
require("dotenv").config();
require("./src/routes")(app, router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`sever is up and running on port ${port}`);
});
