const uuidv1 = require('uuidv1')
const HttpStatus = require('http-status-codes');
const TourEditController = require('./tour-edit-controller');

const cache = {};

exports.get = (req, res) => {
    const { sessionId } = req.params;
    const { place, tourSessionId } = cache[sessionId];
    const tour = TourEditController.cache[tourSessionId];

    if (place) {
        res.json({
            sessionId,
            tourSessionId,
            place: place.toDetailDto(tour)
        });
    } else {
        res.status(HttpStatus.NOT_FOUND).send("Session not found");
    }
};

exports.startEditing = (req, res) => {
    const { tourSessionId, placeId } = req.body;

    const tour = TourEditController.cache[tourSessionId];
    const place = tour.getPlace(placeId);

    if (place) {
        const sessionId = uuidv1();

        cache[sessionId] = {
            place,
            userId: req.userId,
            tourSessionId,
        };

        res.json({
            sessionId,
            tourSessionId,
            place: place.toDetailDto(tour),
        });
    } else {
        res.status(HttpStatus.NOT_FOUND).json({ error });
    }
};

exports.addWidget = (req, res) => {
    const { sessionId } = req.params;
    const { type } = req.body;
    let { place, tourSessionId } = cache[sessionId];
    const tour = TourEditController.cache[tourSessionId];

    if (type === 'text') {
        const textWidget = {
            id: uuidv1(),
            x: 0,
            y: 0,
            content: '[Enter your text]',
            type: 'text',
        };
        place.widgets.push(textWidget);

        res.json({
            sessionId,
            tourSessionId,
            place: place.toDetailDto(tour),
        });
    } else {
        throw new Error('Unknown widget type');
    }
};

exports.cancelChanges = (req, res) => {
    const { sessionId } = req.params;
    const { tourSessionId } = cache[sessionId];
    delete cache[sessionId];
    delete TourEditController.cache[tourSessionId];

    res.status(HttpStatus.OK).json({});
};

// exports.saveChanges = (req, res) => {
//     const { sessionId } = req.params;
//     let { tourSessionId, place } = cache[sessionId];
//     const tour = TourEditController.cache[tourSessionId];

//     const updateData = req.body;

//     place.id = updateData.id;
//     place.name = updateData.name;
//     place.longitude = updateData.longitude;
//     place.latitude = updateData.latitude;
//     place.startPlaceId = updateData.startPlaceId;
//     place.soundName = updateData.soundName;
//     place.description = updateData.description;
//     place.widgets = updateData.widgets;
//     place.markModified('widgets');

//     tour.save().then(() => {
//         res.json({
//             sessionId,
//             tourId: tour.id,
//             place: place.toDetailDto(tour),
//         });
//     }).catch((error) => {
//         res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
//     });
// };

