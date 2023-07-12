const express = require("express");
const app = express();
const path = require('path');
const port = 3000;
const requestRoute = require("./routes/requestRoute");


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))  

const mongo = require("./database/mongo")
mongo()

app.use("/", requestRoute);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, ()=> console.log(`Server running on port ${port}`));