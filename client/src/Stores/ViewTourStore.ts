import { extendObservable, decorate, observable } from 'mobx';
import { TourService } from './../api';
import { TourDetail, RootStore } from './../Stores';

class ViewTourStore {
    rootStore: RootStore;
    tour: TourDetail;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    selectById(id: string) {
        TourService.getById(id).then((resp) => {
            this.tour = new TourDetail(resp.data.tour);
        });
    }
}

decorate(ViewTourStore, {
    tour: observable,
});

export default ViewTourStore;