'use strict';

const schemas = require('../schemas/schemas');

const register = function (req, resp) {
  console.log(req.body);
  let obj = req.body,
    result,
    adhaar = mongoose.model('adhar', schemas.AdhaarSchema);
  if (req.body.email && req.body.uid && req.body.name && req.body.password) {
    adhaar.findOne({ uid: req.body.uid }, function (err, doc) {
      if (doc == null) {
        console.log('Adhar Data Not Found');
        resp.json({ 'type': 'Adhar Data Not Found' });
      }
      else {
        new user({
          email: req.body.email,
          uid: req.body.uid,
          name: req.body.name,
          password: req.body.password,
          dob: doc.dob,
          address: doc.address,
          contact: doc.contact,
          gender: doc.gender
        }).save(function (err, docum) {
          if (err) {
            console.log(err);
            resp.json({ type: 'User' });
          }
          else {
            console.log('User Details:\n' + docum);
            console.log("Registration Successful");
            resp.json({ type: "Registration Successful" });
          }
        });
      }
    })
  }
}; 

module.exports = {
  register
}