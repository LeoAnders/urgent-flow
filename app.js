const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const requestRoute = require("./routes/requestRoute");

mongoose.connect("mongodb://localhost/newrequests", {
  useNewUrlParser: true,  
  useUnifiedTopology: true});

let db = mongoose.connection

db.on("error", ()=> {
  console.log("Error connecting to database");});

db.once("open", ()=> {
  console.log("Connected to database");});

app.use("/", requestRoute);

app.listen(port, ()=> console.log(`Server running on port ${port}`));