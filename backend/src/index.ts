
import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import logger from "morgan";
import fileUpload from 'express-fileupload';
import * as config from './config';
const app = express();
app.use(cors());

import { TourRouter, TourEditRouter, UserRouter, PlaceEditRouter } from "./routers";

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true });
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//TODO: figure out with typing here
app.use(<any>logger("dev"));
app.use(fileUpload());
app.use(express.static(__dirname + '/public'));

// append /api for our http requests
app.use("/api", TourRouter, TourEditRouter, UserRouter, PlaceEditRouter);

app.listen(config.API_PORT, () => console.log(`LISTENING ON PORT ${config.API_PORT}`));