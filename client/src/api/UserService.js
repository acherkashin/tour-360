import client from './client';

export function signUp(user) {
    return client.post('/api/signup', user);
}

export function signIn(email, password) {
    return client.post('/api/signin', { email, password });
}

export function getUser(id) {
    return client.get(`/api/users/${id}`);
}