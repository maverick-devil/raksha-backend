"use strict";

const jwt = require("jsonwebtoken");
jwt.Promise = global.Promise;
const DB_CONSTANTS = require("../constants/MONGODB");

const schemas = require("../schemas/schemas"),
  user = mongoose.model(DB_CONSTANTS.USER_COLLECTION, schemas.userSchema, DB_CONSTANTS.USER_COLLECTION),
  aadhaar = mongoose.model(DB_CONSTANTS.AADHAAR_COLLECTION, schemas.aadhaarSchema, DB_CONSTANTS.AADHAAR_COLLECTION),
  fir = mongoose.model(DB_CONSTANTS.FIR_COLLECTION, schemas.firSchema, DB_CONSTANTS.FIR_COLLECTION);

const login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  user.findOne({"email": email})
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

const regsiter = (req, res) => {
  mongoose.models = {};
  let obj = req.body;
  if (!obj.uid) {

    aadhaar.findOne({"uid": obj.uid})
    .then((doc) => {
      if (!doc || !doc._doc) {
        throw {name: "DataNotFoundError", message: "Aadhar Data Not Found"};
      }
      doc = doc._doc;
      return new user({
        email: obj.email,
        uid: obj.uid,
        name: obj.name,
        password: obj.password,
        dob: doc.dob,
        address: doc.address,
        contact: doc.contact,
        gender: doc.gender,
        device_id: obj.device_id
      }).save();
    })
    .then((doc) => {
      console.log("User Details:\n" + doc._doc);
      res.status(200).json({ "message": "Registration Successful" });
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      switch(err.name){
        case "DataNotFoundError":
          res.status(404).json({"error": "Aadhaar Data Not Found"});
          break;
        case "MongoError":
          res.status(500).json({"error": "User Already Exists!"});
          break;
        default:
          res.status(500).json({"error": +JSON.stringify(err)});
      }
    });
  }
}

const fileFIR = (req, res) => {
  let firDetails = req.body;

  user.findOne({"email": firDetails.email}, '_id, address, contact')
    .exec()
    .then((doc)=>{
      if (!doc) {
        throw {name: "UserNotFoundError", message: "User Not Found"};
      } else {
        return new fir({
          name: firDetails.name,
          user_id: doc._doc._id,
          contact: firDetails.contact,
          occur_date: firDetails.date,
          occur_place: firDetails.place,
          train_no: firDetails.trainNo,
          train_name: firDetails.trainName,
          bogie: firDetails.bogie,
          seat_no: firDetails.seatNo,
          // depart_station: firDetails.departStation,
          // arrive_station: firDetails.arriveStation,
          previous_station: firDetails.previousStation,
          next_station: firDetails.nextStation,
          // address: firDetails.address,
          near_rail_police_station: firDetails.nearRailPoliceStation,
          approval_status: firDetails.approvalStatus,
          approved_by: firDetails.approvedBy,
          service_id: firDetails.serviceId,
          current_status: firDetails.currentStatus,
          suspect_name: firDetails.suspectName,
          suspect_details: firDetails.suspectDetails,
          cost_of_property: firDetails.costOfProperty
        }).save();
      }
    })
    .then(() =>{
      res.status(200).json({"message": "FIR Registered successfully. We'll ping you once it has been confirmed. We are with you."});
      return
    })
    .catch((err) => {
      switch(err.name){
        case "UserNotFoundError":
          res.status(404).json({"error": "Aadhaar Data Not Found"});
          break;
        default:
          res.status(500).json({"error": +JSON.stringify(err)});
      }
    });
}

const viewFiledFIRs = (req, res) => {
  let obj = req.body;
  if (!obj.user._id) {
    fir.findOne({"_id": obj.user._id}, "_id flagged")
      .exec()
      .then((list) => {
        let message = "";
        if(!list.length) {
          message = "No FIR filed yet by " + obj.user.name;
        } else {
          message = "FIRs found";
        }
        res.status(200).json({"message": message, "list": list.filter((doc) => doc.flagged == false).map((doc) => doc._id)});
      })
      .catch((err) => {
        res.status(500).json({"error": "Server side issue: " + JSON.stringify(err)});
      });
  }
}

const firDetails = (req, res) => {
  let obj = req.body;
  if (!obj.user._id && !obj.fir._id) {
    fir.findOne({"_id": obj.fir._id})
      .exec()
      .then((doc) => {
        if (!doc) {
          throw {name: "DataNotFoundError", message: "FIR Data Not Found"};
        }
        res.status(200).json({"message": "FIR Data Found", "fir": doc});
      })
      .catch((err) => {
        switch(err.name) {
          case "DataNotFoundError":
            res.status(404).json({"error": err.message});
            break;
          default:
            res.status(500).json({"error": "Server side issue: " + JSON.stringify(err)});
        }
      });
  } else {
    res.status(404).json({"error": "User or FIR Not Found"});
  }
}

const firConfirmation = (fir_id, user_id) => {
  user.findOne({"user_id": user_id}, '_id, address, contact')
    .exec()
    .then((doc)=>{
      if (!doc) {
        throw {name: "UserNotFoundError", message: "User Not Found"};
      } else {
        const message = "Your FIR with registration no " + fir_id + " has been confirmed. We've started the investigation and will reach out soon.";
        // Code to send notification to the user.
        // Use the above message.
      }
    })
    .catch((err) => {
      switch(err.name){
        case "UserNotFoundError":
          res.status(404).json({"error": "Aadhaar Data Not Found"});
          break;
        default:
          res.status(500).json({"error": +JSON.stringify(err)});
      }
    });
}

module.exports = {
  login,
  regsiter,
  viewFiledFIRs,
  fileFIR,
  firDetails,
  firConfirmation
};