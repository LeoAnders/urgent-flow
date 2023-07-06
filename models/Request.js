const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
  name: {type:String, required: true},
  representative: {type: String},
  requestNumber: {type: Number},
  date:{type:Date },
  shipping: { type: String },
  description:{ type: String }
})

module.exports = mongoose.model("Request", requestSchema)

