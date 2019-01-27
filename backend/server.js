
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const { Place } = require("./models");

const API_PORT = 3001;
const app = express();
let { PlaceRouter, TourRouter } = require("./routers");

// this is our MongoDB database
const dbRoute = "mongodb://localhost:27017/test";

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// append /api for our http requests
app.use("/api", TourRouter, PlaceRouter);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));