import { extendObservable, action, runInAction } from 'mobx';
import { TourService } from './../api';

export default class ViewTourStore {
    constructor(rootStore) {
        extendObservable(this, {
            tour: null,
        });
    }

    selectById(id) {
        TourService.getById(id).then((resp) => {
            this.tour = resp.data.result;
        });
    }
}
