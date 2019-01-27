const mongoose = require("mongoose");

const Tour = new mongoose.Schema({
    name: { type: String, required: true },
    image: { data: Buffer, contentType: String },
    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
    }]
});

module.exports = mongoose.model("Tour", Tour);