import client from './client';

export function getAll() {
    return client.get("/api/tour");
}
export function getById(id) {
    return client.get(`/api/tour/${id}`);
}
export function create(name) {
    return client.post('/api/tour', { name });
}
export function deleteById(id) {
    return client.delete(`/api/tour/delete/${id}`);
}