module.exports = function (app) {

  const officers = require(__dirname + '/controller/officers');
  const user = require(__dirname + '/controller/users');

  //Routes for user

  app.route('/user/login')
    .post((req, res) => console.log('Inside user login; data received:',req));

  app.route('/user/fir')
    .get(() => console.log('Inside user fir; data received:',req.body.params));

  app.route('/user/firstatus')
    .get(() => console.log('Inside user firstatus; data received:',req.body.params));
  
  //Routes for officers

  app.route('/officer/login')
    .get(() => console.log('Inside officer login; data received:',req.body.params));
  
  app.route('/officer/fir')
    .get(() => console.log('Inside officer fir data received:',req.body.params));
  
  
};