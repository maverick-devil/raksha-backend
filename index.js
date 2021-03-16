/**
 * /index.js
 * @description: Root file. Application starts from here.
 */

const express = require("express");
require("dotenv").config();
const db = require("./controller/database")

const app = express();
const NODE_CONSTANTS = require("./constants/SERVER");

// Processing and formatting data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

db.init()
.then(() => {
  // Routes
  require("./router/index")(app);

  // Start the server
  const server = app.listen(NODE_CONSTANTS.NODE_PORT, () => {
    console.log("Listening at: ", JSON.stringify(server.address(), null, 2));
  });
});
