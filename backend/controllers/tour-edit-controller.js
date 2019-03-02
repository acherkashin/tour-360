const uuidv1 = require('uuidv1')
const path = require('path');
const { Tour } = require('./../models');
const { addFile, removeFile } = require('./../utils/fileutils');
const cache = {};

exports.get = (req, res) => {
    const { sessionId } = req.params;
    const tour = cache[sessionId].toDesignerDto();
    res.json({ success: true, tour });
};

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
        const tour = cache[sessionId].toDesignerDto();
        res.json({ success: true, tour });
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
    const { width, height } = req.body;
    const mapImage = req.files.mapImage;

    const tour = cache[sessionId];

    const extension = path.extname(mapImage.name);
    const newFileName = `${tour.id}-${uuidv1()}-map${extension}`;

    addFile(newFileName, mapImage).then(() => {
        tour.mapImage.filename = newFileName;
        tour.mapImage.contentType = mapImage.mimetype;
        tour.mapImage.height = parseInt(height);
        tour.mapImage.width = parseInt(width);

        res.json({ success: true, tour: tour.toDesignerDto() });
    }).catch(error => {
        res.json({ success: false, });
    });
};

exports.addPlace = (req, res) => {
    const { sessionId } = req.params;
    const { name, longitude, latitude } = req.body;
    const tour = cache[sessionId];

    const place = {
        name,
        longitude,
        latitude,
        sound: null,
        image: null,
    };

    tour.places.push(place);

    const dto = tour.toDesignerDto();
    res.json({ success: true, tour: dto });
};

exports.removePlace = (req, res) => {
    const { sessionId, placeId } = req.params;

    const tour = cache[sessionId];
    tour.places = tour.places.filter(item => item.id !== placeId);

    const dto = tour.toDesignerDto();
    res.json({ success: true, tour: dto });
};
