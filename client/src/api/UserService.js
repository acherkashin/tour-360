import client from './client';

export function signUp(user) {
    return client.post('/signup', user);
}