var mongoose = require('mongoose');
var user_schema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, trim: true },
  uid: { type: Number, unique: true, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  dob: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  contact: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true }

});