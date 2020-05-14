/**
 * /index.js
 * @description: Root file. Application starts from here.
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
global.mongoose = require('mongoose');

const NODE_CONSTANTS = require('./constants/SERVER');
const DB_CONSTANTS = require('./constants/MONGODB');

global.mongooseConn = global.mongooseConn ? global.mongooseConn : mongoose.connect(DB_CONSTANTS.MONGODB_ADDRESS + DB_CONSTANTS.MONGODB_PORT + '/');
global.schema = mongoose.schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
require('./router/index')(app);

const server = app.listen(NODE_CONSTANTS.NODE_PORT, () => {
  console.log('Listening at: ', JSON.stringify(server.address(), null, 2));
})