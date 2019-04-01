const HttpStatus = require('http-status-codes');

const verifySession = (req, res, next) => {
    const { sessionId } = req.params;

    if (!sessionId) {
        res.status(HttpStatus.NOT_FOUND).send({ message: `Session with id = ${sessionId} not found` });
    }

    next();
};

module.exports = {
    verifySession,
};