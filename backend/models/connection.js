const mongoose = require("mongoose");

const Connection = new mongoose.Schema({
    startPlaceId: { type: String, required: true },
    endPlaceId: { type: String, required: true },
    // TODO: add restrictions from 0 to 359
    // in angles
    startPlacePosition: { type: Number, default: 0, min: 0, max: 359 },
    // in angles
    endPlacePosition: { type: Number, default: 0, min: 0, max: 359 }
});

Connection.methods.toClient = function (tour) {
    const startPlace = tour.getPlace(this.startPlaceId).toClient();
    const endPlace = tour.getPlace(this.endPlaceId).toClient();

    const dto = {
        id: this.id,
        startPlace,
        endPlace,
        startPlacePosition: this.startPlacePosition,
        endPlacePosition: this.endPlacePosition,
    };

    return dto;
};

Connection.methods.startAsDestination = function (tour) {
    const start = tour.getPlace(this.startPlaceId).toClient();

    return {
        id: this.id,
        placeId: start.id,
        name: start.name,
        latitude: start.latitude,
        longitude: start.longitude,
        image360Name: start.image360Name,
        position: this.endPlacePosition,
    };
};

Connection.methods.endAsDestination = function (tour) {
    const end = tour.getPlace(this.endPlaceId).toClient();

    return {
        id: this.id,
        placeId: end.id,
        name: end.name,
        latitude: end.latitude,
        longitude: end.longitude,
        image360Name: end.image360Name,
        position: this.startPlacePosition,
    };
};

Connection.methods.equals = function (place1Id, place2Id) {
    return (this.startPlaceId === place1Id && this.endPlaceId === place2Id) ||
        (this.startPlaceId === place2Id && this.endPlaceId === place1Id);
};

module.exports = Connection;