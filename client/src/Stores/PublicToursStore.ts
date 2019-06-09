import { action, observable, decorate, computed, runInAction } from 'mobx';
import { TourService } from '../api';
import { Tour, TourDetail, RootStore } from '.';
import {
    TourDto,
} from "./../../../backend/src/models/interfaces";

export default class PublicToursStore {
    selectedTour: TourDetail | null;
    tours: Tour[] = [];

    constructor(rootStore: RootStore) { }

    get hasTours() {
        return (this.tours || []).length > 0;
    }

    selectTour(id: string) {
        TourService.getById(id).then((resp) => {
            runInAction(() => {
                this.selectedTour = new TourDetail(resp.data.tour);
            });
        });
    }

    loadTours = () => {
        TourService.getAllPublic().then((resp) => {
            runInAction(() => {
                (resp.data.tours || []).map(tour => this.updateTourItemFromServer(tour));
            })
        });
    };

    updateTourItemFromServer(json: TourDto) {
        let tour = this.tours.find(tour => tour.id === json.id);
        if (!tour) {
            tour = new Tour(this, json.id);
            this.tours.push(tour);
        }

        tour.updateFromJson(json);

        return tour;
    }
}

decorate(PublicToursStore, {
    tours: observable,
    hasTours: computed,
    updateTourItemFromServer: action,
});
