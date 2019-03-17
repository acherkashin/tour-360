import { extendObservable } from "mobx";

export default class EditConnection {
    constructor(store, sessionId, json) {
        this.store = store;
        this.sessionId = sessionId;
        this.id = json.id;

        extendObservable(this, {
            startPlacePosition: json.startPlacePosition,
            endPlacePosition: json.endPlacePosition,
            startPlace: json.startPlace,
            endPlace: json.endPlace,
        });
    }

    updateFromJson(json) {
        this.startPlacePosition = json.startPlacePosition;
        this.endPlacePosition = json.endPlacePosition;
        this.startPlace = json.startPlace;
        this.endPlace = json.endPlace;
    }
}
