import { extendObservable, action, observable, runInAction } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { UserService } from './../api';

export default class UserStore {
    constructor() {
        extendObservable(this, {
            signInResult: null,
            signUpResult: null,
            get signInLoading() {
                return this.signInResult && this.signInResult.state === "pending";
            },
        });
    }

    get siggnedIn() {
        //TODO alex: to implement
        return true;
    }

    signUp(user) {
        this.signUpResult = fromPromise(UserService.signUp(user)).then((user) => {
            console.log(user)
        });
    }

    signIn(email, password) {
        this.signInResult = fromPromise(UserService.signIn(email, password));
        this.signInResult.then((value) => {
            console.log(value);
            // localStorage.setItem('token', token);
        });
    }

    signOut() {
        this.signInResult = null;
        localStorage.removeItem('token');
    }
}
