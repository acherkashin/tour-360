const mongoose = require("mongoose");

const Tour = new mongoose.Schema({
    name: { type: String, required: true },
    image: { data: Buffer, contentType: String },
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
    };
};

module.exports = mongoose.model("Tour", Tour);