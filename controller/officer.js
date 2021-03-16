"use strict";

const jwt = require("jsonwebtoken");
jwt.Promise = global.Promise;
const DB_CONSTANTS = require("../constants/MONGODB");
const user = require('./user');

const schemas = require("../schemas/schemas"),
  officer = mongoose.model(DB_CONSTANTS.OFFICER_COLLECTION, schemas.officerSchema, DB_CONSTANTS.OFFICER_COLLECTION),
  fir = mongoose.model(DB_CONSTANTS.FIR_COLLECTION, schemas.firSchema, DB_CONSTANTS.FIR_COLLECTION);

const login = (req, res) => {
  var serviceId = req.body.officer.serviceId;
  var token = req.body.token;
  officer.findOne({ "service_id": serviceId })
   .exec()
   .then((doc) => {
      if (!doc) {
        console.log("Service ID not registered");
        resp.json({ "message": "Service ID not registered" });
      } else {
        if (password === doc.password) {
          const accessToken = jwt.sign(JSON.stringify(doc), process.env.ACCESS_TOKEN_SECRET);
          console.log("Login Successful for User " + doc.name);
          res.status(200).json({"accessToken": accessToken, "message": "Login Successful"});
        } else {
            console.log("Incorrect password");
            resp.status(401).json({ "message": "Incorrect password" });
        }
      }
  }).catch((err) => {
    console.log("Error occured", err);
    res.status(500).json({"error": "Error occured"+err});
  });
}

const viewMyFIRs = (req, res) => {
  let obj = req.body;
  if (!obj.officer.service_id) {
    fir.findOne({"service_id": obj.officer.service_id})
      .exec()
      .then((list) => {
        let message = "";
        if(!list.length) {
          message = "No FIRs for you right now!";
        } else {
          message = "FIR(s) found";
        }
        res.status(200).json({"message": message, "list": list.filter((doc) => doc.flagged == false).map((doc) => doc._id)});
      })
      .catch((err) => {
        res.status(500).json({"error": "Server side issue: " + JSON.stringify(err)});
      });
  }
}

const updateFIRStatus = (req, res) => {
  let obj = req.body;
  if (!obj.officer.service_id && !obj.fir._id) {
    fir.findOneAndUpdate({"_id": obj.fir._id}, {"current_status": obj.fir.current_status})
      .exec()
      .then((doc) => {
        if(!doc) {
          res.status(404).json({"error": "FIR Not Found"});
        } else {
          res.status(200).json({"message": "FIR Updated Successfully", "fir": doc});
        }
      })
      .catch((err) => {
        res.status(500).json({"error": "Server side issue: " + JSON.stringify(err)});
      });
  }
}

const confirmFIR = (req, res) => {
  let obj = req.body;
  if (!obj.officer.service_id && !obj.fir._id) {
    fir.findOneAndUpdate({"_id": obj.fir._id}, {"current_status": obj.fir.current_status})
      .exec()
      .then((doc) => {
        if(!doc) {
          res.status(404).json({"error": "FIR Not Found"});
        } else {
          res.status(200).json({"message": "FIR Updated Successfully", "fir": doc});
          user.firConfirmation(fir._id, fir.user_id);
        }
      })
      .catch((err) => {
        res.status(500).json({"error": "Server side issue: " + JSON.stringify(err)});
      });
  }
}

const updatecheckInTime = (req, res) => {

}

module.exports = {
  login,
  viewMyFIRs,
  updateFIRStatus,
  confirmFIR
}