import { extendObservable, action, runInAction } from 'mobx';
import { deepObserve, fromPromise } from 'mobx-utils';
import { PlaceEditService, PlaceService, TourEditService } from './../api';
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
            tourSessionId: null,
            get panoUrl() {
                return TourEditService.getPanoUrl(this.tourSessionId, this.editingPlace.id, UserStore.getToken());
            },
            get saveLoading() {
                return this.saveResult && this.saveResult.state === "pending";
            },
        });
    }

    addWidget(type) {
        if (type === "text") {
            PlaceEditService.addWidget(this.sessionId, type).then(action((resp) => {
                const { place } = resp.data;
                this.editingPlace.updateFromJson(place);
            }))
        } else {
            throw new Error("Unknown widget type");
        }
    }

    beginEditing(tourId, placeId) {
        return PlaceEditService.beginEditing(tourId, placeId).then(action((resp) => {
            const { sessionId, place, tourSessionId } = resp.data;
            this._updateEditingPlace(sessionId, tourSessionId, place);
            return sessionId;
        }));
    }

    getFromSession(sessionId) {
        return PlaceEditService.get(sessionId).then(action((resp) => {
            const { sessionId, place, tourSessionId } = resp.data;
            this._updateEditingPlace(sessionId, tourSessionId, place);

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
        this.saveResult = fromPromise(PlaceEditService.saveChanges(this.sessionId, this.editingPlace.asJson));

        this.saveResult.then(action((result) => {
            const place = result.data.place;
            this.editingPlace.updateFromJson(place);

            if (this.editingWidget) {
                if (this.editingWidget.type === 'text') {
                    // todo: refactor it!!!
                    const widget = place.widgets.find(w => w.id = this.editingWidget.id);
                    this.editingWidget.x = widget.x;
                    this.editingWidget.y = widget.y;
                    this.editingWidget.content = widget.content;
                } else {
                    throw new Error('Unknown widget type');
                }
            }

            this.isDirty = false;
        }));
    }

    updatePlaceSound(soundFile) {
        return TourEditService.uploadPlaceSound(this.tourSessionId, this.editingPlace.id, soundFile).then(action((resp) => {
            const place = resp.data.place;
            this.editingPlace.updateFromJson(place);
        }));
    }

    removePlaceSound() {
        return TourEditService.removePlaceSound(this.tourSessionId, this.editingPlace.id).then(action((resp) => {
            const place = resp.data.place;
            this.editingPlace.updateFromJson(place);
        }));
    }

    viewPlaceImage360() {
        window.open(this.getPlaceImage360Url());
    }

    getPlaceImage360Url() {
        return TourEditService.getPanoUrl(this.tourSessionId, this.editingPlace.id, UserStore.getToken());
    }

    updateImage360(file, width, height) {
        return TourEditService.updateImage360(this.tourSessionId, this.editingPlace.id, file, width, height).then(action((resp) => {
            const place = resp.data.place;
            this.editingPlace.updateFromJson(place);
        }));
    }

    editWidget(id) {
        this.completeEditWidget();
        this.editingWidget = this.editingPlace.widgets.find((value) => value.id === id);
        this._updateEditingWidget(this.editingWidget);
    }

    completeEditWidget() {
        this.editingWidgetDisposer && this.editingWidgetDisposer();
        this.editingWidget = null;
    }

    _updateEditingWidget = action((widget) => {
        this.editingWidgetDisposer && this.editingWidgetDisposer();
        this.editingWidget = widget;
        this.editingWidgetDisposer = deepObserve(this.editingWidget, () => this.isDirty = true);
    });

    _updateEditingPlace = action((sessionId, tourSessionId, place) => {
        this.editingPlace = new EditPlace(place);
        this.isDirty = false;
        this.tourSessionId = tourSessionId;

        this.editingPlaceDisposer = deepObserve(this.editingPlace, () => this.isDirty = true);

        this.sessionId = sessionId;
    });
}
