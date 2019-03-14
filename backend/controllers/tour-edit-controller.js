const uuidv1 = require('uuidv1')
const path = require('path');
const { Tour } = require('./../models');
const { addFile, removeFile } = require('./../utils/fileutils');
const { getPlace } = require('./../utils/tour-utils');
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
    }).catch((error) => {
        res.json({ success: false, error });
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
    const newFileName = generateTourImageName(tour, mapImage);

    addFile(newFileName, mapImage).then(() => {
        tour.mapImage.filename = newFileName;
        tour.mapImage.contentType = mapImage.mimetype;
        tour.mapImage.height = parseInt(height);
        tour.mapImage.width = parseInt(width);

        res.json({ success: true, tour: tour.toDesignerDto() });
    }).catch(error => {
        res.json({ success: false, error });
    });
};

exports.addPlace = (req, res) => {
    const { sessionId } = req.params;
    const tour = cache[sessionId];
    const { name = findFreeNameForPlace(tour), longitude, latitude } = req.body;

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

exports.getPlace = (req, res) => {
    const { sessionId, placeId } = req.params;

    const tour = cache[sessionId];
    const place = tour.places.find(item => item.id === placeId);

    res.json({ success: true, place: place.toClient() })
};

exports.updatePlace = (req, res) => {
    const { sessionId } = req.params;
    const placeUpdate = req.body;
    const place = getPlace(caches[sessionId], placeUpdate.id);

    place.name = placeUpdate.name;
    place.longitude = placeUpdate.longitude;
    place.latitude = placeUpdate.latitude;

    res.json({ success: true, place: place.toClient() });
};

exports.uploadImage360 = (req, res) => {
    const { sessionId, placeId } = req.params;
    const { width, height } = req.body;
    const mapImage = req.files.mapImage;

    const place = getPlace(caches[sessionId], placeId);
    const image360Name = generatePlaceImage360Name(place, mapImage);

    addFile(image360Name, mapImage).then(() => {
        place.image360.filename = image360Name;
        place.image360.contentType = mapImage.mimetype;
        place.image360.height = parseInt(height);
        place.image360.width = parseInt(width);

        res.json({ success: true, place: place.toClient() });
    }).catch(error => {
        res.json({ success: false, error });
    });
};

exports.addConnection = (req, res) => {
    const { sessionId } = req.params;
    const { startPlaceId, endPlaceId } = req.body;
    const tour = cache[sessionId];

    const connection = {
        startPlaceId,
        endPlaceId,
    };

    tour.connections.push(connection);

    res.status(200).json({ tour: tour.toDesignerDto() })
};

function generatePlaceImage360Name(place, mapImage) {
    const extension = path.extname(mapImage.name);
    const newFileName = `${place.id}-${uuidv1()}-place-360${extension}`;

    return newFileName;
}

function generateTourImageName(tour, mapImage) {
    const extension = path.extname(mapImage.name);
    const newFileName = `${tour.id}-${uuidv1()}-map${extension}`;

    return newFileName;
}

function findFreeNameForPlace(tour) {
    const length = tour.places.length;
    for (let i = 1; i <= length; i++) {
        const name = `New Place ${i}`;
        let isFree = true;
        for (let j = 0; j < length; j++) {
            if (tour.places[j].name == name) {
                isFree = false;
                break;
            }
        }

        if (isFree) {
            return name;
        }
    }

    throw Error("No free name");
}
