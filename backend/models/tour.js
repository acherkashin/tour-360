const mongoose = require("mongoose");

const Place = new mongoose.Schema({
    name: { type: String, required: true },
    longitude: { type: Number, required: true, default: 0 },
    latitude: { type: Number, required: true, default: 0 },
    sound: { data: Buffer, contentType: String },
    image360: { data: Buffer, contentType: String },
});

Place.methods.toClient = function () {
    const dto = {
        id: this.id,
        name: this.name,
        latitude: this.latitude,
        longitude: this.longitude,
    };

    return dto;
};

const Tour = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: {
        data: Buffer,
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
        hasImage: this.image.data != null,
    };
};

Tour.methods.toDesignerDto = function () {
    const dto = {
        id: this.id,
        name: this.name,
        places: (this.places || []).map(place => place.toClient()),
        mapType: this.mapType,
        hasMapImage: this.image && this.image.data != null,
        imageWidth: this.image && this.image.width,
        imageHeight: this.image && this.image.height,
    };

    return dto;
};

module.exports = mongoose.model("Tour", Tour);