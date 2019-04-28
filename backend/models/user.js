const mongoose = require('mongoose');
const languages = require('./languages');

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    language: { type: String, enum: languages, required: true, default: 'Русский' },
    tours: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

User.methods.toClient = function () {
    return {
        id: this.id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        language: this.language,
    };
};

module.exports = mongoose.model('User', User);