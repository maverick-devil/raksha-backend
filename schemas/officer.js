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

module.exports = officerSchema;