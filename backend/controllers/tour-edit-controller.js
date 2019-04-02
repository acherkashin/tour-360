const uuidv1 = require('uuidv1')
const path = require('path');
const HttpStatus = require('http-status-codes');
const { Tour } = require('./../models');
const { addFile, removeFile } = require('./../utils/fileutils');
const cache = {};

exports.get = (req, res) => {
    const { sessionId } = req.params;
    const tour = cache[sessionId];

    if (tour) {
        res.json({ tour: tour.toDesignerDto() });
    } else {
        res.status(HttpStatus.NOT_FOUND).send("Session not found");
    }
};

exports.startEditing = (req, res) => {
    const { id } = req.params;

    Tour.findById(id)
        .then(tour => {
            const sessionId = uuidv1();
            cache[sessionId] = tour;
            const dto = tour.toDesignerDto();

            const result = { sessionId, tour: dto };
            res.json({ result });
        }).catch(error => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
        });
};

exports.saveChanges = (req, res) => {
    const { sessionId } = req.params;
    const { startPlaceId, name } = req.body;

    let tour = cache[sessionId];
    tour.startPlaceId = startPlaceId;
    tour.name = name;

    tour.save().then(() => {
        tour = cache[sessionId].toDesignerDto();
        res.json({ tour });
    }).catch((error) => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    });
};

exports.cancelChanges = (req, res) => {
    const { sessionId } = req.params;
    delete cache[sessionId];

    res.json({});
};

exports.uploadMapImage = (req, res) => {
    //TODO: check extensions for images
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

        res.json({ tour: tour.toDesignerDto() });
    }).catch(error => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    });
};

exports.uploadSound = (req, res) => {
    //TODO: add checking extension for uploaded file
    const { sessionId, placeId } = req.params;
    const sound = req.files.sound;

    const tour = cache[sessionId];
    const place = tour.getPlace(placeId);
    const newFileName = generatePlaceSoundName(place, sound);

    addFile(newFileName, sound)
        .then(() => {
            place.sound.filename = newFileName;
            place.sound.contentType = sound.mimetype;

            res.json({ place: place.toDesignerDto(tour) });
        }).catch(error => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        });
};

exports.removeSound = (req, res) => {
    const { sessionId, placeId } = req.params;

    const tour = cache[sessionId];
    const place = tour.getPlace(placeId);

    if (place && place.sound && place.sound.filename) {
        removeFile(place.sound.filename).then(() => {
            res.status(HttpStatus.OK).json({ place: place.toDesignerDto(tour) });
        }).catch((error) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
        });
    } else {
        res.status(HttpStatus.NO_CONTENT).json({ place: place.toDesignerDto(tour) });
    }
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
    res.json({ tour: dto });
};

exports.removePlace = (req, res) => {
    const { sessionId, placeId } = req.params;

    const tour = cache[sessionId];
    tour.places = tour.places.filter(item => item.id !== placeId);

    const dto = tour.toDesignerDto();
    res.json({ tour: dto });
};

exports.getPlace = (req, res) => {
    const { sessionId, placeId } = req.params;

    const tour = cache[sessionId];
    const place = tour.places.find(item => item.id === placeId);

    res.json({ place: place.toDesignerDto(tour) });
};

exports.updatePlace = (req, res) => {
    const { sessionId } = req.params;
    const placeUpdate = req.body;
    const tour = cache[sessionId];
    const place = cache[sessionId].getPlace(placeUpdate.id);

    place.name = placeUpdate.name;
    place.longitude = placeUpdate.longitude;
    place.latitude = placeUpdate.latitude;

    res.json({ place: place.toDesignerDto(tour) });
};

exports.uploadImage360 = (req, res) => {
    const { sessionId, placeId } = req.params;
    const { width, height } = req.body;
    const mapImage = req.files.mapImage;

    const tour = cache[sessionId];
    const place = cache[sessionId].getPlace(placeId);
    const image360Name = generatePlaceImage360Name(place, mapImage);

    addFile(image360Name, mapImage).then(() => {
        place.image360.filename = image360Name;
        place.image360.contentType = mapImage.mimetype;
        place.image360.height = parseInt(height);
        place.image360.width = parseInt(width);

        res.json({ place: place.toDesignerDto(tour) });
    }).catch(error => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    });
};

exports.getConnection = (req, res) => {
    const { sessionId, id } = req.params;
    const tour = cache[sessionId];

    const connection = tour.getConnectionById(id);
    if (!connection) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "connection not found" });
    }

    res.status(HttpStatus.OK).json({ connection: connection.toClient(tour) });
};

exports.addConnection = (req, res) => {
    const { sessionId } = req.params;
    const { startPlaceId, endPlaceId } = req.body;
    const tour = cache[sessionId];

    if (tour.hasConnection(startPlaceId, endPlaceId)) {
        res.status(HttpStatus.CONFLICT).json({ message: "connection already exists" });
        return;
    }

    const connection = {
        startPlaceId,
        endPlaceId,
    };

    tour.connections.push(connection);

    res.status(HttpStatus.OK).json({ tour: tour.toDesignerDto() });
};

exports.updateConnection = (req, res) => {
    const { sessionId } = req.params;
    const connectionUpdate = req.body;
    const tour = cache[sessionId];
    const connection = cache[sessionId].getConnectionById(connectionUpdate.id);

    connection.startPlacePosition = connectionUpdate.startPlacePosition;
    connection.endPlacePosition = connectionUpdate.endPlacePosition;

    res.json({ connection: connection.toClient(tour) });
};

exports.deleteConnection = (req, res) => {
    const { sessionId, place1Id, place2Id } = req.params;
    const tour = cache[sessionId];

    if (!tour.hasConnection(place1Id, place2Id)) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "connection doesn't exist" });
    }

    tour.deleteConnection(place1Id, place2Id);

    res.status(HttpStatus.OK).json({ tour: tour.toDesignerDto() })
}

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

function generatePlaceSoundName(place, sound) {
    const extension = path.extname(sound.name);
    const newFileName = `${place.id}-${uuidv1()}-sound${extension}`;

    return newFileName;
}

function findFreeNameForPlace(tour) {
    const length = tour.places.length;

    if (length === 0) {
        return `New Place 1`;
    }

    for (let i = 1; i <= length; i++) {
        const name = `New Place ${i + 1}`;
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
