/**
 * /router/index.js
 * @description: Main router.
 * All the requests received to server will
 * pass through this file.
 */

module.exports = function (app) {
  app.use("/user", require("./user"));
  app.use("/officer", require("./officer"));
  app.use("/policestation", require("./policeStation"));
};