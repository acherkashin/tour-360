const mongoose = require("mongoose");

const Place = new mongoose.Schema({
    name: { type: String, required: true },
    longitude: { type: Number, required: true, default: 0 },
    latitude: { type: Number, required: true, default: 0 },
    sound: { data: Buffer, contentType: String },
    image360: {
        filename: String,
        contentType: String,
        height: Number,
        width: Number,
    },
});

Place.methods.toClient = function () {
    const dto = {
        id: this.id,
        name: this.name,
        latitude: this.latitude,
        longitude: this.longitude,
        hasImage360: this.mapImage && this.mapImage.filename != null,
        image360Width: this.mapImage && this.mapImage.width,
        image360Height: this.mapImage && this.mapImage.height,
        image360Name: this.mapImage && this.mapImage.filename,
    };

    return dto;
};

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
        places: (this.places || []).map(place => place.toClient()),
        mapType: this.mapType,
        hasMapImage: this.mapImage && this.mapImage.filename != null,
        imageWidth: this.mapImage && this.mapImage.width,
        imageHeight: this.mapImage && this.mapImage.height,
        filename: this.mapImage && this.mapImage.filename,
    };

    return dto;
};

module.exports = mongoose.model("Tour", Tour);