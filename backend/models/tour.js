const mongoose = require("mongoose");
const Place = require('./place');
const Connection = require('./connection');

const Tour = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    startPlaceId: { type: String },
    cover: {
        filename: String,
        contentType: String,
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
    },
    mapImage: {
        filename: String,
        contentType: String,
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
    },
    mapType: { type: String, enum: ['Earth', 'Image'], required: true },
    places: [Place],
    connections: [Connection],
});

Tour.methods.toClient = function () {
    let startPlaceId = this.startPlaceId;

    if (!startPlaceId && (this.places || []).length !== 0) {
        startPlaceId = this.places[0].id;
    }

    return {
        id: this.id,
        name: this.name,
        mapType: this.mapType,
        hasImage: this.cover && this.cover.filename != null,
        filename: this.cover && this.cover.filename,
        startPlaceId
    };
};

Tour.methods.toDesignerDto = function () {
    const dto = {
        id: this.id,
        name: this.name,
        places: (this.places || []).map(place => place.toDesignerDto(this)),
        connections: (this.connections || []).map(connection => connection.toClient(this)),
        mapType: this.mapType,
        hasMapImage: this.mapImage && this.mapImage.filename != null,
        imageWidth: this.mapImage && this.mapImage.width,
        imageHeight: this.mapImage && this.mapImage.height,
        filename: this.mapImage && this.mapImage.filename,
        startPlaceId: this.startPlaceId,
    };

    return dto;
};

Tour.methods.hasConnection = function (startPlaceId, endPlaceId) {
    const connection = (this.connections || []).some(c => c.equals(startPlaceId, endPlaceId));

    return connection;
};

Tour.methods.deleteConnection = function (place1Id, place2Id) {
    this.connections = (this.connections || []).filter(c => !c.equals(place1Id, place2Id));
};

Tour.methods.getConnectionById = function (id) {
    return this.connections.find(c => c.id === id);
};

Tour.methods.getPlace = function (id) {
    const index = this.places.findIndex((value) => value.id === id);
    const place = this.places[index];

    return place;
}

module.exports = mongoose.model("Tour", Tour);