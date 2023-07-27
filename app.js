const express = require("express");
require("dotenv").config();;
const app = express();
const path = require('path');
const requestRoute = require("./routes/requestRoute");
const userRoute = require("./routes/userRoute")

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))  

const mongo = require("./database/mongo")
mongo()

//Routes
app.use("/", requestRoute);
app.use("/user", userRoute)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => {
  console.log("server running");
})