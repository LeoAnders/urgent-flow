const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
  name:{type:String, require:true},
  representative: "string",
  requestNumber: {type:Number, require:true},
  date:{type:Date, required:true},
  shipping: "string",
  sort:{type:String, require:true},
  description: "string"
})

module.exports = mongoose.model("Request", requestSchema)

