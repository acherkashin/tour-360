const mongoose = require("mongoose");
const Place = require('./place');
const Connection = require('./connection');

const Tour = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
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
    return {
        id: this.id,
        name: this.name,
        mapType: this.mapType,
        hasImage: this.cover && this.cover.filename != null,
        filename: this.cover && this.cover.filename,
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

Tour.methods.getById = function (id) {
    return this.connections.find(c => c.id === id);
}

module.exports = mongoose.model("Tour", Tour);