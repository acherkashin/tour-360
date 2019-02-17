const mongoose = require("mongoose");

const Tour = new mongoose.Schema({
    name: { type: String, required: true },
    image: { data: Buffer, contentType: String },
    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
    }]
});

Tour.methods.toClient = function () {
    return {
        id: this.id,
        name: this.name,
        hasImage: this.image.data != null,
    };
};

Tour.methods.toDesignerDto = function() {
    return {
        id: this.id,
        name: this.name,
        places: this.places,
    };
};

module.exports = mongoose.model("Tour", Tour);