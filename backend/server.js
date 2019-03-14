
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");
const fileUpload = require('express-fileupload');
const config = require('./config');
const app = express();
app.use(cors());
const { TourRouter, TourEditRouter } = require("./routers");

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true });
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(fileUpload());
app.use(express.static(__dirname + '/public'));

// append /api for our http requests
app.use("/api", TourRouter, TourEditRouter);

app.listen(config.API_PORT, () => console.log(`LISTENING ON PORT ${config.API_PORT}`));