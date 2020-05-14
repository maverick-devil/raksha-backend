var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, trim: true },
  uid: { type: Number, unique: true, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  dob: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  contact: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true }

});

var officerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contact: { type: Number, unique: true, required: true, trim: true },
  service_id: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  train_no: { type: Number, required: true },
  boarding_stn: { type: String, required: true },
  deboarding_stn: { type: String, required: true },
  duty_duration_from: { type: String, required: true },
  duty_duration_to: { type: String, required: true },
  token: { type: String, required: true, trm: true }
});

var policeStationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, unique: true, required: true, trim: true },
  contact: { type: Number, unique: true, required: true, trim: true },
  train_no: { type: Number },
  station_code: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  token: { type: String, required: true, trm: true }
});

var AdhaarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uid: { type: String, unique: true, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  contact: { type: String, unique: true, required: true },
})

var FIRSchema = new mongoose.Schema({
  fir_id: { type: String, unique: true, required: true },
  name: { type: String, required: true, trim: true },
  contact: { type: Number, required: true, trim: true },
  occur_date: { type: Date, required: true, trim: true },
  occur_place: { type: String, required: true, trim: true },
  train_no: { type: Number, required: true, trim: true },
  train_name: { type: String, required: true, trim: true },
  bogie: { type: String, required: true, trim: true },
  seat_no: { type: Number, required: true, trim: true },
  depart_station: { type: String, required: true, trim: true },
  arrive_station: { type: String, required: true, trim: true },
  neighbouring_stations: { type: [String], required: true, trim: true },
  address: { type: String, required: true, trim: true },
  near_rail_police_stn: { type: String, required: true, trim: true },
  approve_status: { type: String, required: true, trim: true },
  approved_by: { type: String, required: true, trim: true },
  service_id: { type: String, required: true, trim: true },
  progress: { type: String },
  suspect_name: { type: String },
  suspect_details: { type: String },
  cost_of_property: { type: String },
});

var criminalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  no_of_crimes: { type: String, required: true }
})

module.exports = {
  userSchema,
  officerSchema,
  policeStationSchema,
  FIRSchema,
  AdhaarSchema
};