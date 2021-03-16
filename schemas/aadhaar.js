global.mongoose = require("mongoose");

var aadhaarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uid: { type: Number, unique: true, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true }, // Use short forms, i.e. M or F
  email: { type: String, unique: true, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  contact: { type: String, unique: true, required: true },
});

module.exports = aadhaarSchema;