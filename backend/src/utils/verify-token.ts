const jwt = require('jsonwebtoken');
const config = require('./../config.js');
const HttpStatus = require('http-status-codes');
const { getTokenFromRequest } = require('./tokenutils');
const {} = ''

const verifyToken = (req, res, next) => {
    const token = getTokenFromRequest(req);

    if (!token) {
        return res.status(HttpStatus.FORBIDDEN).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                auth: false,
                message: 'Fail to Authentication. Error -> ' + err
            });
        }
        req.userId = decoded.id;
        next();
    });
}

export {
    verifyToken,
};