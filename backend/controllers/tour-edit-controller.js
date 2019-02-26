const uuidv1 = require('uuidv1')
const { Tour } = require('./../models');
const { addFile, removeFile } = require('./../utils/fileutils');
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

    const extension = path.extname(cover.name);
    const newFileName = `${tour.id}-${uuidv1()}-map${extension}`;

    addFile(newFileName, cover).then(() => {
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
