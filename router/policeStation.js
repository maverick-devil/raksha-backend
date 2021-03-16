/**
 * /router/policeStation.js
 * @description: Router for Police Station requests.
 */



const PoliceStationRouter = require("express").Router();
const PoliceStation = require("../controller/policeStation");

PoliceStationRouter.route("/login")
  .post(PoliceStation.login);

  module.exports = PoliceStationRouter;

