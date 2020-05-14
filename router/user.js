/**
 * /router/user.js
 * @description: Router for user requests.
 */



const UserRouter = require('express').Router();
const User = require('../controller/user');

UserRouter.route('/login')
  .post(User.userLogin);

UserRouter.route('/fir')
  .get(() => console.log('Inside user fir; data received:', req.body.params));

UserRouter.route('/firstatus')
  .get(() => console.log('Inside user firstatus; data received:', req.body.params));

module.exports = UserRouter;