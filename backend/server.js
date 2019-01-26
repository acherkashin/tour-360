
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const { Place } = require("./models");

const API_PORT = 3001;
const app = express();
const router = express.Router();

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

router.get("/place/get", (req, res) => {
  Place.find((err, places) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, places });
  });
});

router.post("/place/update", (req, res) => {
  const { id, update } = req.body;
  Place.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/place/delete", (req, res) => {
  const { id } = req.body;
  Place.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/place/create", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.json({
      success: false,
      error: "Name should be provided"
    });
  }

  const place = new Place({
    id: mongoose.Types.ObjectId(),
    name
  });

  place.save(err => {
    if (err) {
      return res.json({ success: false, error: err });
    } else {
      return res.json({ success: true });
    }
  });
});

// append /api for our http requests
app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));