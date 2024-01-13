const mongoose = require("mongoose");

const dimensionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Dimension", dimensionSchema);
