import client from './client';
import { TourEditService } from '.';
import { VR_URL } from '../config';
import {
    PlaceDetailDto,
} from "./../../../backend/src/models/interfaces";

export function beginEditing(tourId: string, placeId: string) {
    return TourEditService.beginEditing(tourId).then((resp) => {
        const { sessionId } = resp.data.result;
        return client.post(`/api/place-edit/`, {
            tourSessionId: sessionId,
            placeId,
        });
    })
}
export function get(sessionId: string) {
    return client.get(`/api/place-edit/${sessionId}/get`);
}
export function cancelChanges(sessionId: string) {
    return client.post(`/api/place-edit/${sessionId}/cancel`);
}
export function saveChanges(sessionId: string, place: PlaceDetailDto) {
    return client.post(`/api/place-edit/${sessionId}/save`, place);
}
export function addWidget(sessionId: string, type: string) {
    return client.post(`/api/place-edit/${sessionId}/addWidget`, { type });
}
export function getPanoUrl(sessionId: string, placeId: string, token: string) {
    return `${VR_URL}?placeSessionId=${sessionId}&placeId=${placeId}&token=${token}`;
}
