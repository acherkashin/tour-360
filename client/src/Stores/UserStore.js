import { extendObservable, action, observable, runInAction } from 'mobx';
import { UserService } from './../api';

export default class UserStore {
    constructor() {
        extendObservable(this, {

        });
    }

    signUp(user) {
        UserService.signUp(user).then(() => {
            console.log("CREATED");
        });
    }
}
