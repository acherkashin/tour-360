import uuidv1 from 'uuidv1';
import { NOT_FOUND, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { cache as _cache } from './tour-edit-controller';
import { Tour, Place, } from './../models/interfaces';
import { Request, Response } from 'express';

interface PlaceEditCache {
    tourSessionId: string;
    place: Place;
    userId: string;
}

const cache: { [key: string]: PlaceEditCache } = {};

export function get(req, res) {
    const { sessionId } = req.params;
    const { place, tourSessionId } = cache[sessionId];
    const tour = _cache[tourSessionId];

    if (place) {
        res.json({
            sessionId,
            tourSessionId,
            place: place.toDetailDto(tour)
        });
    } else {
        res.status(NOT_FOUND).send("Session not found");
    }
}

export function startEditing(req, res) {
    const { tourSessionId, placeId } = req.body;

    const tour = _cache[tourSessionId];
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
        res.status(NOT_FOUND).json({ error: 'place not found' });
    }
}

export function addWidget(req: Request, res: Response) {
    const { sessionId } = req.params;
    const { type } = req.body;
    let { place, tourSessionId } = cache[sessionId];
    const tour = _cache[tourSessionId];

    if (type === 'text') {
        const textWidget = {
            id: uuidv1(),
            x: 0,
            y: 0,
            content: '[Enter your text]',
            type: 'text',
            color: '#000000',
            backgroundColor: '#ffffff',
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
}

export function cancelChanges(req: Request, res: Response) {
    const { sessionId } = req.params;
    const placeEditSession = cache[sessionId];

    if (placeEditSession) {
        const { tourSessionId } = placeEditSession;
        delete cache[sessionId];
        delete _cache[tourSessionId];

        res.status(OK).json({});
    } else {
        res.status(NOT_FOUND).json({});
    }
}

export function saveChanges(req: Request, res: Response) {
    const { sessionId } = req.params;
    let { tourSessionId, place } = cache[sessionId];
    const tour = _cache[tourSessionId];

    const updateData = req.body;

    place.name = updateData.name;
    place.longitude = updateData.longitude;
    place.latitude = updateData.latitude;
    place.description = updateData.description;
    place.widgets = updateData.widgets;
    place.markModified('widgets');

    tour.save().then(() => {
        res.json({
            sessionId,
            tourId: tour.id,
            place: place.toDetailDto(tour),
        });
    }).catch((error) => {
        res.status(INTERNAL_SERVER_ERROR).json({ error });
    });
}

