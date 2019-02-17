import client from './client';

export function beginEditing(tourId) {
    return client.post(`/api/tour-edit/${tourId}`);
}
export function saveChanges(sessionId) {
    return client.post(`/api/tour-edit/${sessionId}/save`);
}
export function cancelChanges(sessionId) {
    return client.post(`/api/tour-edit/${sessionId}/cancel`);
}
