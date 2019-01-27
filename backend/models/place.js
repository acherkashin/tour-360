const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Place = new Schema({
    name: { type: String, required: true },
    sound: { data: Buffer, contentType: String },
    image360: { data: Buffer, contentType: String },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }
});

module.exports = mongoose.model("Place", Place);