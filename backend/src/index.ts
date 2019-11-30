
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import fileUpload from 'express-fileupload';
import { DataBase } from "./models/database"
import * as config from './config';
const app = express();
app.use(cors());

import { TourRouter, TourEditRouter, UserRouter, PlaceEditRouter } from "./routers";

console.log(config.MONGO_URL);


const database = new DataBase({
    url: config.MONGO_URL,
}).init();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
//TODO: figure out with typing here
app.use(<any>logger("dev"));
app.use(fileUpload());
app.get('/ping', function (req, res) {
    return res.send('pong');
});
app.use(express.static(__dirname + '/../public'));

app.use("/api", TourRouter, TourEditRouter, UserRouter, PlaceEditRouter);

app.listen(config.API_PORT, () => console.log(`BACKEND LISTENING ON PORT ${config.API_PORT}`));