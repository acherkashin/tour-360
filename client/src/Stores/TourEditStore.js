import { extendObservable, action, runInAction } from 'mobx';
import { TourEditService } from './../api';
import { EditTour, EditPlace, EditConnection } from './';
import { deepObserve } from 'mobx-utils';
import { VR_URL } from './../config';
import UserStore from './UserStore'

export default class TourEditStore {
    constructor() {
        this.editingTourDisposer = null;

        extendObservable(this, {
            editingTour: null,
            editingPlace: null,
            editingConnection: null,
            sessionId: null,
            firstConnectionPlace: null, 
            isDirty: false,
        });
    }

    getFromSession(sessionId) {
        return TourEditService.get(sessionId).then(action((resp) => {
            const { tour } = resp.data;
            this._updateEditingTour(sessionId, tour);

            return this.editingTour;
        }));
    }

    beginEditing(tourId) {
        return TourEditService.beginEditing(tourId).then(action((resp) => {
            const { tour, sessionId } = resp.data.result;
            this._updateEditingTour(sessionId, tour);
            return sessionId;
        }));
    }

    editPlace(placeId) {
        this.editingConnection = null;
        return TourEditService.getPlace(this.sessionId, placeId).then(action((resp) => {
            const { place } = resp.data;
            this.editingPlace = new EditPlace(this, this.sessionId, place);
        }));
    }

    selectPlace(place) {
        if (this.firstConnectionPlace) {
            if (this.editingTour.hasConnection(this.firstConnectionPlace.id, place.id)) {
                this.firstConnectionPlace = null;
                return;
            }

            TourEditService.addConnection(this.sessionId, this.firstConnectionPlace.id, place.id).then(action((resp) => {
                const { tour } = resp.data;
                this.editingTour.updateFromJson(tour);
                this.firstConnectionPlace = null;
            }));
        } else {
            runInAction(() => this.firstConnectionPlace = place);
        }
    }

    deleteConnection(place1Id, place2Id) {
        return TourEditService.deleteConnection(this.sessionId, place1Id, place2Id).then(action((resp) => {
            const { tour } = resp.data;
            this.editingTour.updateFromJson(tour);

            if (this.editingPlace) {
                TourEditService.getPlace(this.sessionId, this.editingPlace.id).then((resp) => {
                    const { place } = resp.data;
                    this.editingPlace && this.editingPlace.updateFromJson(place);
                });
            }
        }));
    }

    editConnection(connectionId) {
        this.editingPlace = null;
        return TourEditService.getConnection(this.sessionId, connectionId).then((action((resp) => {
            this.editingConnection = new EditConnection(this, this.sessionId, resp.data.connection);
        })));
    }

    saveEditingPlace(cancel = false) {
        return TourEditService.updatePlace(this.sessionId, this.editingPlace.asJson).then(action((resp) => {
            const { place } = resp.data;
            this.editingTour.updatePlaceFromJson(place);

            if (cancel) {
                this.cancelEditingPlace();
            } else {
                this.editingPlace.updateFromJson(place);
            }
        }));
    }

    cancelEditingPlace() {
        this.editingPlace = null;
    }

    saveEditingConnection(cancel = false) {
        return TourEditService.updateConnection(this.sessionId, this.editingConnection.asJson).then(action((resp) => {
            const { connection } = resp.data;

            this.editingTour.updateConnectionFromJson(connection);

            if (cancel) {
                this.editingConnection = null;
            } else {
                this.editingConnection.updateFromJson(connection);
            }
        }));
    }

    cancelEditing() {
        return TourEditService.cancelChanges(this.sessionId).then(action(() => {
            this.editingTour = null;
            this.editingPlace = null;
            this.isDirty = false;
            this.editingTourDisposer && this.editingTourDisposer();
        }))
    }

    completeEditing() {
        return TourEditService.saveChanges(this.sessionId, {
            name: this.editingTour.name,
            startPlaceId: this.editingTour.startPlaceId,
        }).then(action((result) => {
            this.editingTour.updateFromJson(result.data.tour);
        }));
    }

    updateImageMap = action((file, width, height) => {
        return TourEditService.uploadMapImage(this.sessionId, file, width, height).then(action((resp) => {
            this.editingTour.updateFromJson(resp.data.tour);
            this.editingTour.refreshCover();
        }));
    })

    updateImage360(file, width, height) {
        return TourEditService.updateImage360(this.sessionId, this.editingPlace.id, file, width, height).then(action((resp) => {
            const place = resp.data.place;
            this.editingTour.updatePlaceFromJson(place);
            this.editingPlace && this.editingPlace.updateFromJson(place);
        }));
    }

    updatePlaceSound(soundFile) {
        return TourEditService.uploadPlaceSound(this.sessionId, this.editingPlace.id, soundFile).then(action((resp) => {
            const place = resp.data.place;
            this.editingTour.updatePlaceFromJson(place);
            this.editingPlace && this.editingPlace.updateFromJson(place);
        }));
    }

    removePlaceSound() {
        return TourEditService.removePlaceSound(this.sessionId, this.editingPlace.id).then(action((resp) => {
            const place = resp.data.place;
            this.editingTour.updatePlaceFromJson(place);
            this.editingPlace && this.editingPlace.updateFromJson(place);
        }));
    }

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

    viewPlaceImage360(placeId) {
        window.open(this.getPlaceImage360Url(placeId));
    }

    getPlaceImage360Url(placeId) {
        return `${VR_URL}?sessionId=${this.sessionId}&placeId=${placeId}&token=${UserStore.getToken()}`;
    }

    _updateEditingTour = action((sessionId, tour) => {
        this.editingTour = new EditTour(this, sessionId, tour);
        this.isDirty = false;

        this.editingTourDisposer = deepObserve(this.editingTour, (change, path, root) => {
            this.isDirty = true;
        });

        this.sessionId = sessionId;
    });
}
