import { extendObservable, action, runInAction, decorate, observable, computed } from 'mobx';
import { deepObserve, fromPromise, IDisposer } from 'mobx-utils';
import { PlaceEditService, PlaceService, TourEditService } from './../api/';
import { UserStore, RootStore } from '.';
import EditPlace from './Models/EditPlace';
import { BaseWidget, TextWidget } from '../../../backend/src/models/interfaces';

export default class PlaceEditStore {
    saveResult: any;
    editingPlace: EditPlace;
    editingWidget: BaseWidget;
    isDirty = false;
    tourSessionId: string;
    sessionId: string;

    rootStore: RootStore;
    editingPlaceDisposer: IDisposer;
    editingWidgetDisposer: IDisposer;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.editingPlaceDisposer = null;
        this.editingWidgetDisposer = null;
    }

    get panoUrl() {
        return TourEditService.getPanoUrl(this.tourSessionId, this.editingPlace.id, UserStore.getToken());
    }

    get saveLoading() {
        return this.saveResult && this.saveResult.state === "pending";
    }

    addWidget(type) {
        if (type === "text") {
            PlaceEditService.addWidget(this.sessionId, type).then((resp) => {
                const { place } = resp.data;
                runInAction(() => this.editingPlace.updateFromJson(place));
            });
        } else {
            throw new Error("Unknown widget type");
        }
    }

    beginEditing(tourId, placeId) {
        return PlaceEditService.beginEditing(tourId, placeId).then((resp) => {
            const { sessionId, place, tourSessionId } = resp.data;
            runInAction(() => this._updateEditingPlace(sessionId, tourSessionId, place));
            return sessionId;
        });
    }

    getFromSession(sessionId) {
        return PlaceEditService.get(sessionId).then((resp) => {
            const { sessionId, place, tourSessionId } = resp.data;

            runInAction(() => this._updateEditingPlace(sessionId, tourSessionId, place));

            return this.editingPlace;
        });
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

        return this.saveResult.then(action((result) => {
            const place = result.data.place;
            this.editingPlace.updateFromJson(place);

            if (this.editingWidget) {
                if (this.editingWidget.type === 'text') {
                    // todo: refactor it!!!
                    const widget: TextWidget = place.widgets.find(w => w.id = this.editingWidget.id);
                    (<TextWidget>this.editingWidget).x = widget.x;
                    (<TextWidget>this.editingWidget).y = widget.y;
                    (<TextWidget>this.editingWidget).content = widget.content;
                } else {
                    throw new Error('Unknown widget type');
                }
            }

            this.isDirty = false;
        }));
    }

    updatePlaceSound(soundFile) {
        return TourEditService.uploadPlaceSound(this.tourSessionId, this.editingPlace.id, soundFile).then((resp) => {
            const place = resp.data.place;
            runInAction(() => this.editingPlace.updateFromJson(place));
        });
    }

    removePlaceSound() {
        return TourEditService.removePlaceSound(this.tourSessionId, this.editingPlace.id).then((resp) => {
            const place = resp.data.place;
            runInAction(() => this.editingPlace.updateFromJson(place));
        });
    }

    viewPlaceImage360() {
        window.open(this.getPlaceImage360Url());
    }

    getPlaceImage360Url() {
        return TourEditService.getPanoUrl(this.tourSessionId, this.editingPlace.id, UserStore.getToken());
    }

    updateImage360(file, width, height) {
        return TourEditService.updateImage360(this.tourSessionId, this.editingPlace.id, file, width, height).then((resp) => {
            const place = resp.data.place;
            this.editingPlace.updateFromJson(place);
        });
    }

    deleteWidget(id) {
        this.editingWidget && this.editingWidget.id === id && this.completeEditWidget();
        this._deleteWidget(id);
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

    _deleteWidget(id) {
        if (this.editingPlace.widgets && this.editingPlace.widgets.length) {
            this.editingPlace.widgets = this.editingPlace.widgets.filter(widget => widget.id !== id);
        }
    }

    _updateEditingWidget = action((widget: BaseWidget) => {
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

decorate(PlaceEditStore, {
    saveResult: observable,
    editingPlace: observable,
    editingWidget: observable,
    isDirty: observable,
    tourSessionId: observable,
    sessionId: observable,
});