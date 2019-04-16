const jwt = require('jsonwebtoken');
const config = require('./../config');

exports.createToken = function (user) {
    const token = jwt.sign({
        id: user._id,
    }, config.SECRET_KEY,
        {
            expiresIn: '24h'
        });

    return token;
}

exports.getTokenFromRequest = function (req) {
    // Express headers are auto converted to lowercase
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    return token;
}