/**
 * /router/officer.js
 * @description: Router for Officer requests.
 */



const OfficerRouter = require("express").Router();
const Officer = require("../controller/officer");
const Authenticate = require("../controller/authenticate");

OfficerRouter.route("/login")
  .post();

OfficerRouter.route("/update-fir-status")
  .get(Authenticate.authenticateToken, Officer.updateFIRStatus);

OfficerRouter.route("/confirm-fir")
  .get(Authenticate.authenticateToken, Officer.confirmFIR);

module.exports = OfficerRouter;