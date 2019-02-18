const uuidv1 = require('uuidv1')
const { Tour } = require('./../models');

const cache = {};

exports.startEditing = (req, res) => {
    const { id } = req.params;

    Tour.findById(id)
        .then(tour => {
            const sessionId = uuidv1();
            cache[sessionId] = tour;
            const dto = tour.toDesignerDto();

            const result = { sessionId, tour: dto };
            res.json({ success: true, result });
        }).catch(error => {
            res.json({ success: false, error });
        });
};

exports.saveChanges = (req, res) => {
    const { sessionId } = req.params;
    cache[sessionId].save().then(() => {
        const tour = cache[sessionId];
        res.json({ success: true, tour: tour });
    }).catch((err) => {
        res.json({ success: false, error: err });
    });
};

exports.cancelChanges = (req, res) => {
    const { sessionId } = req.params;
    delete cache[sessionId];

    res.json({ success: true });
};

exports.uploadMapImage = (req, res) => {
    const { sessionId } = req.params;

    const mapImage = req.files.mapImage;
    cache[sessionId].image.data = mapImage.data;
    cache[sessionId].image.contentType = mapImage.mimetype;

    res.json({ success: true, tour: cache[sessionId] });
};

exports.getMapImage = (req, res) => {
    const { sessionId } = req.params;

    const tour = cache[sessionId];
    res.end(tour.image.data, 'binary');
};
