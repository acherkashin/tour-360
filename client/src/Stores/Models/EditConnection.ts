import { extendObservable } from "mobx";

export default class EditConnection {
    readonly id: string;
    readonly store: any;
    readonly sessionId: string;
    startPlacePosition: string;
    endPlacePosition: string;
    startPlace: string;
    endPlace: string;

    constructor(store: any, sessionId: string, json) {
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

    get asJson() {
        return {
            id: this.id,
            startPlacePosition: this.startPlacePosition,
            endPlacePosition: this.endPlacePosition,
        };
    }
}
