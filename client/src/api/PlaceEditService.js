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

export function updateImage360(sessionId, file, width, height) {
    const formData = new FormData();
    formData.append('placeImage', file);
    formData.append('width', width);
    formData.append('height', height);

    return client.post(`/api/place-edit/${sessionId}/uploadImage360`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}
