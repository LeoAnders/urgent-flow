const express = require("express");
const app = express();
const path = require('path');
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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))  

app.use("/", requestRoute);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, ()=> console.log(`Server running on port ${port}`));