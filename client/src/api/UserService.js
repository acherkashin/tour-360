import client from './client';

export function signUp(user) {
    return client.post('/signup', user);
}

export function signIn(email, password) {
    return client.post('/signin', { email, password });
}