const login = require('./login');

const userLogin = function (req, res) {
  login.login(req, res);
}

module.exports = {
  userLogin
};