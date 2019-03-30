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


    signUp(user) {
        this.signUpResult = fromPromise(UserService.signUp(user));
    }

    signIn(email, password) {
        this.signInResult = fromPromise(UserService.signIn(email, password));
    }
}
