const mongoose = require("mongoose");

const Place = new mongoose.Schema({
    name: { type: String, required: true },
    longitude: { type: Number, required: true, default: 0 },
    latitude: { type: Number, required: true, default: 0 },
    sound: { filename: String, contentType: String },
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
        hasImage360: this.image360 && this.image360.filename != null,
        image360Width: this.image360 && this.image360.width,
        image360Height: this.image360 && this.image360.height,
        image360Name: this.image360 && this.image360.filename,
    };

    return dto;
};

Place.methods.toDesignerDto = function (tour) {
    const starts = (tour.connections || []).filter(c => c.startPlaceId === this.id).map(c => c.endAsDestination(tour));
    const ends = (tour.connections || []).filter(c => c.endPlaceId === this.id).map(c => c.startAsDestination(tour));

    const dto = {
        id: this.id,
        name: this.name,
        latitude: this.latitude,
        longitude: this.longitude,
        hasImage360: this.image360 && this.image360.filename != null,
        image360Width: this.image360 && this.image360.width,
        image360Height: this.image360 && this.image360.height,
        image360Name: this.image360 && this.image360.filename,
        soundName: this.sound && this.sound.filename,
        connections: [...starts, ...ends],
    };

    return dto;
};

module.exports = Place;
