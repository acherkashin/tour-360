const mongoose = require('mongoose');

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

User.methods.toClient = function () {
    return {
        id: this.id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
    };
};

module.exports = mongoose.model('User', User);