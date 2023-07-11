const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
  name: {type:String, required: true},
  representative: {type: String},
  requestNumber: {type: Number},
  date:{type:Date, required: true},
  shipping: { type: String },
  description:{ type: String },
  finished:{type:Boolean, default:false}
})

module.exports = mongoose.model("Request", requestSchema)

