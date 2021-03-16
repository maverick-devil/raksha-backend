const { ObjectId } = require("mongodb");

var firSchema = new mongoose.Schema({
  fir_id: { type: String, unique: true, required: true },
  name: { type: String, required: true, trim: true },
  user_id: { type: ObjectId, required: true},
  contact: { type: Number, required: true, trim: true },
  occur_date: { type: Date, required: true, trim: true },
  occur_place: { type: String, required: true, trim: true },
  train_no: { type: Number, required: true, trim: true },
  train_name: { type: String, required: true, trim: true },
  bogie: { type: String, required: true, trim: true },
  seat_no: { type: Number, required: true, trim: true },
  // depart_station: { type: String, required: true, trim: true },
  // arrive_station: { type: String, required: true, trim: true },
  previous_station: { type: String, required: true, trim: true },
  next_station: { type: String, required: true, trim: true },
  // address: { type: String, required: true, trim: true },
  near_rail_police_stn: { type: String, required: true, trim: true },
  approval_status: { type: String, required: true, trim: true },   //Pending, Approved, Not Approved
  approved_by: { type: String, required: true, trim: true },
  service_id: { type: String, required: true, trim: true },
  current_status: { type: String, required: true, trim: true },
  suspect_name: { type: String, required: true, trim: true },
  suspect_details: { type: String, required: true, trim: true },
  cost_of_property: { type: String, required: true, trim: true },
  flagged: { type: Boolean, required: true}
});

module.exports = firSchema;