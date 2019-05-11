import uuidv1 from 'uuidv1';
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK, NO_CONTENT, CONFLICT } from 'http-status-codes';
import { Tour } from '../models';
import { addFile, removeFile, generatePlaceImage360Name, generateTourImageName, generatePlaceSoundName } from '../utils/fileutils';

const cache = {}
const _cache = cache;
export { _cache as cache };

export function get(req, res) {
    const { sessionId } = req.params;
    const tour = cache[sessionId];

    if (tour) {
        res.json({ tour: tour.toDetailDto() });
    } else {
        res.status(NOT_FOUND).send("Session not found");
    }
}

export function startEditing(req, res) {
    const { id } = req.params;

    Tour.findById(id)
        .then(tour => {
            const sessionId = uuidv1();
            cache[sessionId] = tour;
            const dto = tour.toDetailDto();

            const result = { sessionId, tour: dto };
            res.json({ result });
        }).catch(error => {
            res.status(INTERNAL_SERVER_ERROR).json({ error });
        });
}

export function saveChanges(req, res) {
    const { sessionId } = req.params;
    const { startPlaceId, name, isPublic } = req.body;

    let tour = cache[sessionId];
    tour.startPlaceId = startPlaceId;
    tour.name = name;
    tour.isPublic = isPublic;

    tour.save().then(() => {
        tour = cache[sessionId].toDetailDto();
        res.json({ tour });
    }).catch((error) => {
        res.status(INTERNAL_SERVER_ERROR).json({ error });
    });
}

export function cancelChanges(req, res) {
    const { sessionId } = req.params;
    delete cache[sessionId];

    res.json({});
}

export function uploadMapImage(req, res) {
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

        res.json({ tour: tour.toDetailDto() });
    }).catch(error => {
        res.status(INTERNAL_SERVER_ERROR).json({ error });
    });
}

export function uploadSound(req, res) {
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

            res.json({ place: place.toDetailDto(tour) });
        }).catch(error => {
            res.status(INTERNAL_SERVER_ERROR)
        });
}

export function removeSound(req, res) {
    const { sessionId, placeId } = req.params;

    const tour = cache[sessionId];
    const place = tour.getPlace(placeId);

    if (place && place.sound && place.sound.filename) {
        removeFile(place.sound.filename).then(() => {
            place.sound = null;

            res.status(OK).json({ place: place.toDetailDto(tour) });
        }).catch((error) => {
            res.status(INTERNAL_SERVER_ERROR).json({ error });
        });
    } else {
        res.status(NO_CONTENT).json({ place: place.toDetailDto(tour) });
    }
}

export function addPlace(req, res) {
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

    const dto = tour.toDetailDto();
    res.json({ tour: dto });
}

export function removePlace(req, res) {
    const { sessionId, placeId } = req.params;

    const tour = cache[sessionId];
    tour.places = tour.places.filter(item => item.id !== placeId);

    const dto = tour.toDetailDto();
    res.json({ tour: dto });
}

export function getPlace(req, res) {
    const { sessionId, placeId } = req.params;

    const tour = cache[sessionId];
    const place = tour.places.find(item => item.id === placeId);

    res.json({ place: place.toDetailDto(tour) });
}

export function updatePlace(req, res) {
    const { sessionId } = req.params;
    const placeUpdate = req.body;
    const tour = cache[sessionId];
    const place = cache[sessionId].getPlace(placeUpdate.id);

    place.name = placeUpdate.name;
    place.longitude = placeUpdate.longitude;
    place.latitude = placeUpdate.latitude;
    place.description = placeUpdate.description;
    place.widgets = placeUpdate.widgets;
    place.markModified('widgets');

    res.json({ place: place.toDetailDto(tour) });
}

export function uploadImage360(req, res) {
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

        res.json({ place: place.toDetailDto(tour) });
    }).catch(error => {
        res.status(INTERNAL_SERVER_ERROR).json({ error });
    });
}

export function getConnection(req, res) {
    const { sessionId, id } = req.params;
    const tour = cache[sessionId];

    const connection = tour.getConnectionById(id);
    if (!connection) {
        res.status(NOT_FOUND).json({ message: "connection not found" });
    }

    res.status(OK).json({ connection: connection.toClient(tour) });
}

export function addConnection(req, res) {
    const { sessionId } = req.params;
    const { startPlaceId, endPlaceId } = req.body;
    const tour = cache[sessionId];

    if (tour.hasConnection(startPlaceId, endPlaceId)) {
        res.status(CONFLICT).json({ message: "connection already exists" });
        return;
    }

    const connection = {
        startPlaceId,
        endPlaceId,
    };

    tour.connections.push(connection);

    res.status(OK).json({ tour: tour.toDetailDto() });
}

export function updateConnection(req, res) {
    const { sessionId } = req.params;
    const connectionUpdate = req.body;
    const tour = cache[sessionId];
    const connection = cache[sessionId].getConnectionById(connectionUpdate.id);

    connection.startPlacePosition = connectionUpdate.startPlacePosition;
    connection.endPlacePosition = connectionUpdate.endPlacePosition;

    res.json({ connection: connection.toClient(tour) });
}

export function deleteConnection(req, res) {
    const { sessionId, place1Id, place2Id } = req.params;
    const tour = cache[sessionId];

    if (!tour.hasConnection(place1Id, place2Id)) {
        res.status(NOT_FOUND).json({ message: "connection doesn't exist" });
    }

    tour.deleteConnection(place1Id, place2Id);

    res.status(OK).json({ tour: tour.toDetailDto() })
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
