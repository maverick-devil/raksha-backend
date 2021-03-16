var mongoose = require("mongoose");

var policeStationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, unique: true, required: true, trim: true },
  contact: { type: Number, unique: true, required: true, trim: true },
  station_code: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  token: { type: String, required: true, trm: true }
});

module.exports = policeStationSchema