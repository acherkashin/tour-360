import client from './client';
import { TourEditService } from './';
import { VR_URL } from './../config';

export function beginEditing(tourId, placeId) {
    return TourEditService.beginEditing(tourId).then((resp) => {
        const { sessionId } = resp.data.result;
        return client.post(`/api/place-edit/`, {
            tourSessionId: sessionId,
            placeId,
        });
    })
}
export function get(sessionId) {
    return client.get(`/api/place-edit/${sessionId}/get`);
}
export function cancelChanges(sessionId) {
    return client.post(`/api/place-edit/${sessionId}/cancel`);
}
export function saveChanges(sessionId, place) {
    return client.post(`/api/place-edit/${sessionId}/save`, place);
}
export function addWidget(sessionId, type) {
    return client.post(`/api/place-edit/${sessionId}/addWidget`, { type });
}
export function getPanoUrl(sessionId, placeId, token) {
    return `${VR_URL}?placeSessionId=${sessionId}&placeId=${placeId}&token=${token}`;
}
