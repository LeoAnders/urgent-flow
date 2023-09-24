const express = require("express");
require("dotenv").config();
const path = require("path");
const socketIO = require("socket.io");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const requestRoute = require("./routes/requestRoute");
const userRoute = require("./routes/userRoute");
const passport = require("passport");
const { ensureAuthenticated } = require("./controllers/authController");

const app = express();

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

// Passport config
require("./controllers/passport")(passport);

// MongoDB connection
const mongo = require("./database/mongo");
mongo();

//Express session
app.use(
  session({
    store: new MongoStore({
      mongoUrl: process.env.MONGODB_URI,
      collection: "sessions",
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use("/user", express.json(), userRoute);
app.use("/", ensureAuthenticated, express.json(), requestRoute);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, () => {
  console.log("Server running");
});

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New connection");

  //Notification new request
  socket.on("notification", (data) => {
    socket.broadcast.emit("new-notification", data);
  });

  //Notification concluded
  socket.on("notification-concluded", (data) => {
    io.emit("new-notification-concluded", data);
  });
});
