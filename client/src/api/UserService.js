import client from './client';

export function signUp(user, ReCAPTCHAValue) {
    return client.post('/api/signup', { user, ReCAPTCHAValue });
}

export function signIn(email, password, ReCAPTCHAValue) {
    return client.post('/api/signin', { email, password, ReCAPTCHAValue });
}

export function editUser(user) {
    return client.post('/api/editUser', user);
}

export function getUser(id) {
    return client.get(`/api/users/${id}`);
}
