const { Tour } = require('./../models');
const uuidv1 = require('uuidv1')
const path = require('path');
const HttpStatus = require('http-status-codes');

const cache = {};

exports.get = (req, res) => {
    const { sessionId } = req.params;
    const { place, tour } = cache[sessionId];

    if (place) {
        res.json({
            sessionId,
            tourId: tour.id,
            place: place.toDetailDto(tour)
        });
    } else {
        res.status(HttpStatus.NOT_FOUND).send("Session not found");
    }
};

exports.startEditing = (req, res) => {
    const { tourId, placeId } = req.body;

    Tour.findById(tourId)
        .then(tour => {
            const place = tour.getPlace(placeId);

            if (place) {
                const sessionId = uuidv1();

                cache[sessionId] = {
                    place,
                    userId: req.userId,
                    tour,
                };

                res.json({
                    sessionId,
                    tourId: tour.id,
                    place: place.toDetailDto(tour),
                });
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ error });
            }
        }).catch(error => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
        });
};

exports.saveChanges = (req, res) => {
    const { sessionId } = req.params;

    let { tour, place } = cache[sessionId];
    tour.save().then(() => {
        res.json({
            sessionId,
            tourId: tour.id,
            place: place.toDetailDto(tour),
        });
    }).catch((error) => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    });
};

exports.cancelChanges = (req, res) => {
    const { sessionId } = req.params;
    delete cache[sessionId];

    res.status(HttpStatus.OK).json({});
};