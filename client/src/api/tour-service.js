import client from './client';

export function getAll() {
    return client.get("/api/tour");
}
export function getById(id) {
    return client.get(`/api/tour/${id}`);
}
export function create(name, mapType) {
    return client.post('/api/tour', { name, mapType });
}
export function deleteById(id) {
    return client.delete(`/api/tour/${id}`);
}
export function uploadCover(id, file) {
    const formData = new FormData();
    formData.append('cover', file);

    return client.post(`/api/tour/${id}/cover`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}