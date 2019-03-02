import { extendObservable, action, observable } from 'mobx';
import { TourService, TourEditService } from './../api';
import { Tour, EditTour } from './';
import { deepObserve } from 'mobx-utils';

export default class TourStore {
    constructor() {
        this.editingTourDisposer = null;

        extendObservable(this, {
            tours: observable.array([]),
            selectedTour: null,
            editingTour: null,
            sessionId: null,
            get designerIsOpened() {
                return this.editingTour != null
            },
            get hasTours() {
                return (this.tours || []).length > 0;
            },
            isDirty: false,
        });
    }

    beginEditing(tourId) {
        return TourEditService.beginEditing(tourId).then(action((resp) => {
            const { tour, sessionId } = resp.data.result;
            this.editingTour = new EditTour(this, sessionId, tour);
            this.isDirty = false;
            this.editingTourDisposer = deepObserve(this.editingTour, (change, path, root) => {
                this.isDirty = true;
            });

            this.sessionId = resp.data.result.sessionId;
        }));
    }

    cancelEditing() {
        return TourEditService.cancelChanges(this.sessionId).then(action(() => {
            this.editingTour = null;
            this.isDirty = false;
            this.editingTourDisposer && this.editingTourDisposer();
        }))
    }

    saveEditing() {
        return TourEditService.saveChanges(this.sessionId).then(action((result) => {
            this.editingTour.updateFromJson(result.data.tour);
        }));
    }

    getById(id) {
        return TourService.getById(id).then((resp) => {
            return this.updateTourFromServer(resp.data.result);
        });
    }

    loadTours = action(() => {
        TourService.getAll().then(action((resp) => {
            (resp.data.result || []).map(tour => this.updateTourFromServer(tour));
            //TODO: remove
            // if (this.tours && this.tours.length) {
            //     this.beginEditing(this.tours[0].id);
            // }
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

    addPlace(place) {
        return TourEditService.addPlace(this.sessionId, place).then(action((resp) => {
            this.editingTour.updateFromJson(resp.data.tour);
        }));
    }

    removePlace(id) {
        return TourEditService.removePlace(this.sessionId, id).then(action((resp) => {
            this.editingTour.updateFromJson(resp.data.tour);
        }));
    }

    updateImageMap = action((file, width, height) => {
        return TourEditService.uploadMapImage(this.sessionId, file, width, height).then(action((resp) => {
            this.editingTour.updateFromJson(resp.data.tour);
            this.editingTour.refreshCover();
        }));
    })

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
