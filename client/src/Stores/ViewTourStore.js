import { extendObservable } from 'mobx';
import { TourService } from './../api';
import TourDetail from './../Stores/Models/TourDetail';

export default class ViewTourStore {
    constructor(rootStore) {
        this.rootStore = rootStore;

        extendObservable(this, {
            tour: null,
        });
    }

    selectById(id) {
        TourService.getById(id).then((resp) => {
            this.tour = new TourDetail(resp.data.result);
        });
    }
}
