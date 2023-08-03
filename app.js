const express = require("express");
require("dotenv").config();;
const path = require('path');
const flash = require("connect-flash");
const session = require("express-session");
const requestRoute = require("./routes/requestRoute");
const userRoute = require("./routes/userRoute");
const passport = require("passport")
const { ensureAuthenticated } = require("./controllers/authController")

const app = express();

// EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))  

// Passport config
require("./controllers/passport")(passport);

// MongoDB connection
const mongo = require("./database/mongo")
mongo()

//Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect Flash
app.use(flash())

// Global vars
app.use((req, res, next)=>{
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash("error")
  next()
})

//Routes
app.use("/user", express.json(), userRoute)
app.use("/",ensureAuthenticated, express.json(), requestRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => {
  console.log("server running");
})