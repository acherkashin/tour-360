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
export function uploadMapImage(sessionId, file) {
    const formData = new FormData();
    formData.append('mapImage', file);

    return client.post(`/api/tour-edit/${sessionId}/uploadMapImage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
