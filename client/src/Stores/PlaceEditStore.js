import { extendObservable, action, runInAction } from 'mobx';
import { deepObserve, fromPromise } from 'mobx-utils';
import { PlaceEditService, PlaceService } from './../api';
import { UserStore } from './../Stores';
import EditPlace from './../Stores/Models/EditPlace';

export default class PlaceEditStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.editingPlaceDisposer = null;
        this.editingWidgetDisposer = null;

        extendObservable(this, {
            saveResult: null,
            editingPlace: null,
            editingWidget: null,
            isDirty: false,
            tourId: null,
            get panoUrl() {
                return PlaceService.getPanoUrl(this.tourId, this.editingPlace.id, UserStore.getToken());
            },
            get saveLoading() {
                return this.saveResult && this.saveResult.state === "pending";
            },
        });
    }

    viewPlaceImage360(placeId) {
        window.open(this.getPlaceImage360Url(placeId));
    }

    getPlaceImage360Url(placeId) {
        return PlaceEditService.getPanoUrl(this.sessionId, placeId, UserStore.getToken());
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
            this._updateEditingPlace(sessionId, tourId, place);

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

    completeEditing() {
        this.saveResult = fromPromise(PlaceEditService.saveChanges(this.sessionId, {}));

        this.saveResult.then(action((result) => {
            this.editingPlace.updateFromJson(result.data.place);
            this.isDirty = false;
        }));
    }

    updateImage360(file, width, height) {
        return PlaceEditService.updateImage360(this.sessionId, file, width, height).then(action((resp) => {
            const place = resp.data.place;
            this.editingPlace.updateFromJson(place);
        }));
    }

    editWidget(id) {
        this.completeEditWidget();
        this.editingWidget = this.editingPlace.widgets.find((value) => value.id === id);
        this.editingWidgetDisposer = deepObserve(this.editingWidget, () => this.isDirty = true);
    }

    completeEditWidget() {
        this.editingWidgetDisposer && this.editingWidgetDisposer();
        this.editingWidget = null;
    }

    _updateEditingPlace = action((sessionId, tourId, place) => {
        this.editingPlace = new EditPlace(place);
        this.isDirty = false;
        this.tourId = tourId;

        this.editingPlaceDisposer = deepObserve(this.editingPlace, () => this.isDirty = true);

        this.sessionId = sessionId;
    });
}
