import { extendObservable } from 'mobx';
import localStorage from 'mobx-localstorage';
import { fromPromise } from 'mobx-utils';
import decode from 'jwt-decode';
import { UserService } from './../api';

export default class UserStore {
    constructor() {
        extendObservable(this, {
            signInResult: null,
            signUpResult: null,
            getCurrentUserResult: null,
            currentUser: null,
            get signInLoading() {
                return this.signInResult && this.signInResult.state === "pending";
            },
            get singInRejected() {
                return this.signInResult && this.signInResult.state === "rejected";
            },
            get siggnedIn() {
                const token = UserStore.getToken();
                return !!token;
            }
        });
    }

    signUp(userData) {
        this.signUpResult = fromPromise(UserService.signUp(userData)).then((resp) => {
            console.log(resp);
        });

        return this.signUpResult;
    }

    signIn(email, password) {
        this.signInResult = fromPromise(UserService.signIn(email, password));
        this.signInResult.then((resp) => {
            const { user, token } = resp.data;
            UserStore.setToken(token);
            this.currentUser = user;
        });

        return this.signInResult;
    }

    getCurrentUser() {
        if (UserStore.getCurrentUser()) {
            const id = UserStore.getCurrentUser().id;
            this.getCurrentUserResult = fromPromise(UserService.getUser(id));

            this.getCurrentUserResult.then((resp) => {
                this.currentUser = resp.data.user;
            }, () => {
                UserStore.clearToken();
            });
        } else {
            throw new Error("Current user doesn't exist.");
        }
    }

    signOut() {
        this.signInResult = null;
        UserStore.clearToken();
    }

    static getToken() {
        return localStorage.getItem('id_token');
    }

    static setToken(token) {
        localStorage.setItem('id_token', token);
    }

    static clearToken() {
        localStorage.removeItem('id_token');
    }

    static getCurrentUser() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }
}
