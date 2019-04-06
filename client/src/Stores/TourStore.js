import { extendObservable, action, observable } from 'mobx';
import { TourService } from './../api';
import { Tour } from './';
import { VR_URL } from './../config';
import UserStore from './UserStore'

export default class TourStore {
    constructor() {
        this.editingTourDisposer = null;

        extendObservable(this, {
            tours: observable.array([]),
            selectedTour: null,
            editingTour: null,
            editingPlace: null,
            editingConnection: null,
            sessionId: null,
            firstConnectionPlace: null,
            get designerIsOpened() {
                return this.editingTour != null
            },
            get hasTours() {
                return (this.tours || []).length > 0;
            },
            isDirty: false,
        });
    }

    getById(id) {
        return TourService.getById(id).then((resp) => {
            return this.updateTourFromServer(resp.data.result);
        });
    }

    loadTours = action(() => {
        TourService.getAll().then(action((resp) => {
            (resp.data.result || []).map(tour => this.updateTourFromServer(tour));
        }));
    });

    updateTourFromServer = action((json) => {
        let tour = this.tours.find(tour => tour.id === json.id);
        if (!tour) {
            tour = new Tour(this, json.id);
            this.tours.push(tour);
        }

        tour.updateFromJson(json);

        return tour;
    });

    create(name, mapType) {
        return TourService.create(name, mapType).then(() => this.loadTours());
    }

    delete(id) {
        return TourService.deleteById(id).then(() => {
            this._deleteById(id);
        });
    }

    updateCover = action((id, file) => {
        return TourService.uploadCover(id, file).then(action((resp) => {
            const tour = this.tours.find(tour => tour.id === id);
            tour.updateFromJson(resp.data.tour);
            tour.refreshCover();
        }));
    });

    view(tourId, placeId) {
        const tour = this._getById(tourId);
        if (!placeId) {
            placeId = tour.startPlaceId;
        }
        window.open(`${VR_URL}?tourId=${tourId}&placeId=${placeId}&token=${UserStore.getToken()}`);
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
        this.tours.splice(this.tours.indexOf(tour), 1);
    });
}
