/**
 * /router/officer.js
 * @description: Router for user requests.
 */



const OfficerRouter = require('express').Router();
const Officer = require('../controller/officer');

OfficerRouter.route('/login')
  .post((req, res) => console.log('Inside officer login; data received:', req));

OfficerRouter.route('/fir')
  .get(() => console.log('Inside officer fir; data received:', req.body.params));

OfficerRouter.route('/firstatus')
  .get(() => console.log('Inside officer firstatus; data received:', req.body.params));

module.exports = OfficerRouter;