/**
 * /router/user.js
 * @description: Router for User requests.
 */

"use strict";

const UserRouter = require("express").Router();
const Authenticate = require("../controller/authenticate");
const User = require("../controller/user");

UserRouter.route("/login")
  .post(User.login);

UserRouter.route("/filefir")
  .post(Authenticate.authenticateToken, User.fileFIR);

UserRouter.route("/viewfiledfirs")
  .post(Authenticate.authenticateToken, User.viewFiledFIRs);

UserRouter.route("/firdetails")
  .post(Authenticate.authenticateToken, User.firDetails);

UserRouter.route("/register")
  .post(User.regsiter);

module.exports = UserRouter;