"use strict";

const jwt = require("jsonwebtoken");
jwt.Promise = global.Promise;
const DB_CONSTANTS = require("../constants/MONGODB");

const schemas = require("../schemas/schemas"),
  policeStation = mongoose.model(DB_CONSTANTS.USER_COLLECTION, schemas.userSchema, DB_CONSTANTS.USER_COLLECTION),
  aadhaar = mongoose.model(DB_CONSTANTS.AADHAAR_COLLECTION, schemas.aadhaarSchema, DB_CONSTANTS.AADHAAR_COLLECTION),
  fir = mongoose.model(DB_CONSTANTS.FIR_COLLECTION, schemas.firSchema, DB_CONSTANTS.FIR_COLLECTION);

const login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  policeStation.findOne({"email": email})
    .exec()
    .then((doc)=>{
      if (!doc) {
        console.log("Email id not registered");
        res.status(401).json({ "message": "Email id not registered" });
      } else {
        if (password === doc.password) {
          const accessToken = jwt.sign(JSON.stringify(doc), process.env.ACCESS_TOKEN_SECRET);
          console.log("Login Successful for User " + doc.name);
          res.status(200).json({"accessToken": accessToken, "message": "Login Successful"});
        } else {
          console.log("Incorrect password");
          res.status(401).json({ "message": "Incorrect password" });
        }
      }
    }).catch((err) => {
      console.log("Error occured", err);
      res.status(500).json({"error": "Error occured"+err});
    });
}

module.exports = {
  login
};