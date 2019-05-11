import { extendObservable, action, observable, decorate, computed, runInAction } from 'mobx';
import { TourService, PlaceService } from '../api';
import { Tour, TourDetail, RootStore } from '.';
import UserStore from './UserStore';
import {
    TourDto,
} from "./../../../backend/src/models/interfaces";

export default class TourStore {
    selectedTour: TourDetail | null;
    tours: Tour[] = [];

    constructor(rootStore: RootStore) {

    }

    get hasTours() {
        return (this.tours || []).length > 0;
    }

    selectTour(id: string) {
        TourService.getById(id).then((resp) => {
            this.selectedTour = new TourDetail(resp.data.tour);
        });
    }

    loadTours = action(() => {
        TourService.getAll().then((resp) => {
            runInAction(() => {
                (resp.data.tours || []).map(tour => this.updateTourItemFromServer(tour));
            })
        });
    });

    updateTourItemFromServer = action((json: TourDto) => {
        let tour = this.tours.find(tour => tour.id === json.id);
        if (!tour) {
            tour = new Tour(this, json.id);
            this.tours.push(tour);
        }

        tour.updateFromJson(json);

        return tour;
    });

    create(name: string, mapType: string) {
        return TourService.create(name, mapType).then(() => this.loadTours());
    }

    delete(id: string) {
        return TourService.deleteById(id).then(() => {
            this._deleteById(id);
        });
    }

    updateCover = action((id, file) => {
        return TourService.uploadCover(id, file).then((resp) => {
            runInAction(() => {
                this.loadTours();
                this.selectedTour && this.selectedTour.updateFromJson(resp.data.tour);
            })
        });
    });

    viewMap(tourId) {
        window.open(`/tour/${tourId}/view-tour`);
    }

    //TODO: rename to view360 or viewPlace
    view(tourId, placeId) {
        const tour = this._getById(tourId);
        if (!placeId && tour != null) {
            placeId = tour.startPlaceId;
        }
        const url = PlaceService.getPanoUrl(tourId, placeId, UserStore.getToken());
        window.open(url);
    }

    _getById(id) {
        const tour = this.tours.find(t => t.id === id);
        return tour;
    }

    _deleteById = action((id) => {
        if (this.selectedTour && this.selectedTour.id === id) {
            this.selectedTour = null;
        }
        const tour = this._getById(id);
        if (tour) {
            this.tours.splice(this.tours.indexOf(tour), 1);
        }
    });
}

decorate(TourStore, {
    selectedTour: observable,
    tours: observable,
    hasTours: computed,
});
