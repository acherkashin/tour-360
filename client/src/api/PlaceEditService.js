import client from './client';

export function beginEditing(tourId, placeId) {
    return client.post(`/api/place-edit/`, {
        tourId,
        placeId,
    });
}
export function get(sessionId) {
    return client.get(`/api/place-edit/${sessionId}/get`);
}
export function cancelChanges(sessionId) {
    return client.post(`/api/place-edit/${sessionId}/cancel`);
}
