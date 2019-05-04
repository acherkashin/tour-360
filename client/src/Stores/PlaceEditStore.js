import { extendObservable, action, runInAction } from 'mobx';
import { deepObserve, fromPromise } from 'mobx-utils';
import { PlaceEditService, PlaceService } from './../api';
import { UserStore } from './../Stores';
import PlaceDesignerModel from './../Stores/Models/PlaceDesignerModel';

export default class PlaceEditStore {
    constructor(rootStore) {
        this.rootStore = rootStore;

        extendObservable(this, {
            editingPlace: null,
            isDirty: false,
            tourId: null,
            get panoUrl() {
                return PlaceService.getPanoUrl(this.tourId, this.editingPlace.id, UserStore.getToken());
            }
        });
    }

    beginEditing(tourId, placeId) {
        return PlaceEditService.beginEditing(tourId, placeId).then(action((resp) => {
            const { sessionId, place, tourId } = resp.data;
            this._updateEditingPlace(sessionId, tourId, place);
            return sessionId;
        }));
    }

    getFromSession(sessionId) {
        return PlaceEditService.get(sessionId).then(action((resp) => {
            const { sessionId, place, tourId } = resp.data;
            this._updateEditingPlace(sessionId, place, tourId);

            return this.editingPlace;
        }));
    }

    cancelEditing() {
        return PlaceEditService.cancelChanges(this.sessionId).then(action(() => {
            this.editingPlace = null;
            this.isDirty = false;
            this.editingPlaceDisposer && this.editingPlaceDisposer();
        }))
    }

    updateImage360(file, width, height) {
        return PlaceEditService.updateImage360(this.sessionId, file, width, height).then(action((resp) => {
            const place = resp.data.place;
            this.editingPlace.updateFromJson(place);
        }));
    }

    _updateEditingPlace = action((sessionId, tourId, place) => {
        this.editingPlace = new PlaceDesignerModel(place);
        this.isDirty = false;
        this.tourId = tourId;

        this.editingPlaceDisposer = deepObserve(this.editingPlace, () => this.isDirty = true);

        this.sessionId = sessionId;
    });
}
