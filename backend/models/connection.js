const mongoose = require("mongoose");
const { getPlace } = require('./../utils/tour-utils');

const Connection = new mongoose.Schema({
    startPlaceId: { type: String, required: true },
    endPlaceId: { type: String, required: true },
    // how many degrees you need to rotate the scene when moving
    rotatationScene: { type: Number },
    // TODO: add restrictions from 0 to 359
    // in angles
    startPlacePosition: { type: Number, default: 0, min: 0, max: 359 },
    // in angles
    endPlacePosition: { type: Number, default: 0, min: 0, max: 359 }
});

Connection.methods.toClient = function (tour) {
    const startPlace = getPlace(tour, this.startPlaceId).toClient();
    const endPlace = getPlace(tour, this.endPlaceId).toClient();

    const dto = {
        id: this.id,
        startPlace,
        endPlace,
        rotationScene: this.rotationScene,
        startPlacePosition: this.startPlacePosition,
        endPlacePosition: this.endPlacePosition,
    };

    return dto;
};

Connection.methods.startAsDestination = function (tour) {
    const start = getPlace(tour, this.startPlaceId).toClient();

    return {
        id: start.id,
        name: start.name,
        latitude: start.latitude,
        longitude: start.longitude,
        image360Name: start.image360Name,
        position: this.endPlacePosition,
    };
};

Connection.methods.endAsDestination = function (tour) {
    const end = getPlace(tour, this.endPlaceId).toClient();

    return {
        id: end.id,
        name: end.name,
        latitude: end.latitude,
        longitude: end.longitude,
        image360Name: end.image360Name,
        position: this.startPlacePosition,
    };
};

module.exports = Connection;