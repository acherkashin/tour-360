import client from './client';

export function getAll() {
    return client.get("/api/place");
}
export function create(name) {
    return client.post('/api/place', { name });
}
export function deleteById(id) {
    return client.delete(`/api/place/delete/${id}`).then(this.getAllPlaces);
}