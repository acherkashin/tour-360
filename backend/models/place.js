const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Place = new Schema({
    id: mongoose.Types.ObjectId,
    name: { type: String, required: true },
    sound: { data: Buffer, contentType: String },
    image360: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("Place", Place);