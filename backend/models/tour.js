const mongoose = require("mongoose");

const Tour = new mongoose.Schema({
    name: { type: String, required: true },
    image: {
        data: Buffer,
        contentType: String,
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
    },
    mapType: { type: String, enum: ['Earth', 'Image'], required: true },
    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
    }],
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
    return {
        id: this.id,
        name: this.name,
        places: this.places,
        mapType: this.mapType,
        hasMapImage: this.image && this.image.data != null,
        imageWidth: this.image && this.image.width,
        imageHeight: this.image && this.image.height,
    };
};

module.exports = mongoose.model("Tour", Tour);