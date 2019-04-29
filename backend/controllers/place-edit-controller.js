const { Tour } = require('./../models');
const uuidv1 = require('uuidv1')
const HttpStatus = require('http-status-codes');
const { 
    addFile, 
    generatePlaceImage360Name,
} = require('./../utils/fileutils');
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

exports.uploadImage360 = (req, res) => {
    //TODO: check extensions for images
    const { sessionId } = req.params;
    const { width, height } = req.body;
    const placeImage = req.files.placeImage;

    const { tour, place } = cache[sessionId];
    const newFileName = generatePlaceImage360Name(tour, placeImage);

    addFile(newFileName, placeImage).then(() => {
        place.image360.filename = newFileName;
        place.image360.contentType = placeImage.mimetype;
        place.image360.height = parseInt(height);
        place.image360.width = parseInt(width);

        res.json({
            sessionId,
            tourId: tour.id,
            place: place.toDetailDto(tour),
        });
    }).catch(error => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    });
};

exports.cancelChanges = (req, res) => {
    const { sessionId } = req.params;
    delete cache[sessionId];

    res.status(HttpStatus.OK).json({});
};
