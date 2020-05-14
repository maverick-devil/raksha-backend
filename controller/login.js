'use strict';

const schemas = require('../schemas/schemas');

const login = function (req, resp) {
  console.log(req.body);
  var role = req.body.role;
  var pass = req.body.pass;
  /*************Passenger Login********************/
  if (role == 'passenger') {
    var emailid = req.body.email;
    var doc;
    var user = mongoose.model('user',schemas.userSchema);

    user.findOne({ 'email': emailid }, function (err, doc) {
      if (doc == null) {
        console.log('Email id not registered');
        resp.json({ "message": 'Email id not registered' });
      }
      else if (err) {
        console.log(err);
      }
      else {
        if (pass == doc.password) {
          console.log("Login Successful");
          resp.json({ "message": "Login Successful" });
        }
        else {
          console.log('Incorrect password');
          resp.json({ message: 'Incorrect password' })
        }
      }
    })
  }
  /***************Officer Login******************/
  else if (role == 'officer') {
    var serv_id = req.body.serviceId;
    var token = req.body.token;
    police_officer.findOne({ 'service_id': serv_id }, function (err, doc) {
      if (doc == null) {
        console.log('Service ID not registered');
        resp.json({ "message": 'Service ID not registered' });
      }
      else if (err)
        console.log(err);
      else {
        if (pass == doc.password) {
          console.log("Login Successful");
          resp.json({ "message": "Login Successful" });
        }
        else {
          console.log('Incorrect password');
          resp.json({ "message": 'Incorrect password' })
        }
      }
    });
  }
  /***************Station Login******************/
  else if (role == 'station') {
    console.log(req.body);
    var stn_code = req.body.stationCode;
    var token = req.body.token;
    police_station.findOneAndUpdate({ 'station_code': stn_code }, { token: token }, function (err, doc) {
      if (doc == null) {
        console.log('Station ID Incorrect');
        resp.json({ "message": 'Station ID Incorrect' });
      }
      else if (err)
        console.log(err);
      else {
        if (pass == doc.password) {
          console.log("Login Successful");
          resp.json({ "message": "Login Successful" });
        }
        else {
          console.log('Incorrect password');
          resp.json({ "message": 'Incorrect password' })
        }
      }
    });
  }
}

const login1 = function (req, res) {
  console.log('Request received for login');
  let collection,
    id,
    token;
  switch (req.body.role) {
    case 'passenger':
      collection = mongooseConn.schema(schemas.userSchema);
      id = req.body.email;
      break;
    case 'officer':
      collection = mongooseConn.schema(schemas.officerSchema);
      id = req.body.serviceId;
      break;
    case 'police_station':
      collection = mongooseConn.schema(schemas.policeStationSchema);
      id = req.body.emailid;
      break;
  }
  // let response = await collection.findOne({})
}

module.exports = {
  login
};