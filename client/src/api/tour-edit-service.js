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
export function addPlace(sessionId, place) {
    return client.post(`/api/tour-edit/${sessionId}/addPlace`, place);
}
export function uploadMapImage(sessionId, file, width, height) {
    const formData = new FormData();
    formData.append('mapImage', file);
    formData.append('width', width);
    formData.append('height', height);

    return client.post(`/api/tour-edit/${sessionId}/uploadMapImage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
