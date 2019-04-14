import { extendObservable } from 'mobx';
import { TourService } from './../api';
import EditTour from './../Stores/Models/EditTour';

export default class ViewTourStore {
    constructor(rootStore) {
        this.rootStore = rootStore;

        extendObservable(this, {
            tour: null,
        });
    }

    selectById(id) {
        TourService.getById(id).then((resp) => {
            //TODO: we shouldn't to use EditTour here
            this.tour = new EditTour(this.rootStore.tourEditStore, resp.data.result);
        });
    }
}
