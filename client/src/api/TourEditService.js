import client from './client';

export function get(sessionId) {
    return client.get(`/api/tour-edit/${sessionId}/get`);
}
export function beginEditing(tourId) {
    return client.post(`/api/tour-edit/${tourId}`);
}
export function saveChanges(sessionId, options) {
    return client.post(`/api/tour-edit/${sessionId}/save`, options);
}
export function cancelChanges(sessionId) {
    return client.post(`/api/tour-edit/${sessionId}/cancel`);
}
export function addPlace(sessionId, place) {
    return client.post(`/api/tour-edit/${sessionId}/addPlace`, place);
}
export function removePlace(sessionId, placeId) {
    return client.delete(`/api/tour-edit/${sessionId}/place/${placeId}`);
}
export function getPlace(sessionId, placeId) {
    return client.get(`/api/tour-edit/${sessionId}/place/${placeId}`);
}
export function updatePlace(sessionId, place) {
    return client.put(`/api/tour-edit/${sessionId}/place`, place);
}
export function addConnection(sessionId, startPlaceId, endPlaceId) {
    return client.post(`/api/tour-edit/${sessionId}/addConnnection`, {
        startPlaceId,
        endPlaceId,
    });
}
export function deleteConnection(sessionId, place1Id, place2Id) {
    return client.delete(`/api/tour-edit/${sessionId}/removeConnection/${place1Id}/${place2Id}`);
}
export function getConnection(sessionId, connectionId) {
    return client.get(`/api/tour-edit/${sessionId}/connection/${connectionId}`);
}
export function updateConnection(sessionId, connection) {
    return client.put(`/api/tour-edit/${sessionId}/connection`, connection);
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

export function updateImage360(sessionId, placeId, file, width, height) {
    const formData = new FormData();
    formData.append('mapImage', file);
    formData.append('width', width);
    formData.append('height', height);

    return client.post(`/api/tour-edit/${sessionId}/place/${placeId}/uploadImage360`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export function uploadPlaceSound(sessionId, placeId, file) {
    const formData = new FormData();
    formData.append('sound', file);

    return client.post(`/api/tour-edit/${sessionId}/place/${placeId}/sound`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export function removePlaceSound(sessionId, placeId) {
    return client.delete(`/api/tour-edit/${sessionId}/place/${placeId}/sound`);
}
