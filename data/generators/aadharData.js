"use strict";

const random_name = require("random-indian-name");
const DateGenerator = require("random-date-generator")
const db = require("../../controller/database");
const schemas = require("../../schemas/schemas");
const aadharSchema = schemas.aadhaarSchema;
const DB_CONSTANTS = require("../../constants/MONGODB");
mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
// db.init()
// .then(() => {
  const aadharDoc = mongoose.model(DB_CONSTANTS.AADHAAR_COLLECTION, aadharSchema, DB_CONSTANTS.AADHAAR_COLLECTION);
  mongoose.connect( DB_CONSTANTS.MONGODB_ADDRESS + DB_CONSTANTS.MONGODB_PORT + "/" + DB_CONSTANTS.DB_NAME,
  {useNewUrlParser: true})
  .then(() => {
    for(let i=0; i<50; i++) {
      let name = random_name({ random: Math.random, gender: i % 2 == 0 ? "male" : "female"});
      let uid = 100000000000 + (i + 1);
      let dob = DateGenerator.getRandomDateInRange(new Date(1985, 0, 1), new Date(2000, 11, 31)).toISOString().split("T")[0];
      let gender = i % 2 == 0 ? "M" : "F";
      let email = name.split(' ').join('.').toLowerCase()+"@gmail.com";
      let address = (100 + (i + 1)) + " " + ["A", "B", "C"][i%3] + ", " + ["Ekta", "Karnik", "Padma", "Ashok", "Akash"][i%5] + " Nagar, " + ["Solapur", "Kolhapur", "Beed", "Aurangabad", "Akola", "Pune", "Mumbai"][i%7];
      let pincode = 400000 + [13100, 16100, 31100, 31100, 44100, 121000, 0][i%7] + (i+1);
      let contact = 9123456700 + (i + 1);
      console.log("User", (i + 1), " Details:", name, uid, dob, gender, email, address, pincode, contact);
      new aadharDoc({
        name: name,
        uid: uid,
        dob: dob,
        gender: gender,
        email: email,
        address: address,
        pincode: pincode,
        contact: contact
      }).save()
      .then((doc) => {
        console.log("User Details:\n" + doc._doc);
      })
      .catch(err => console.log(JSON.stringify(err)));
    };
  })
  .catch((err)=> {
    console.log(err);
  });

