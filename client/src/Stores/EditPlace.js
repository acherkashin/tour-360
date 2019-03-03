import { extendObservable, toJS } from "mobx";

export default class EditPlace {
    constructor(store, sessionId, json) {
        this.store = store;
        this.sessionId = sessionId;
        this.id = json.id;

        extendObservable(this, {
            longitude: null,
            latitude: null,
            name: '',
        });

        this.updateFromJson(json);
    }

    updateFromJson(json) {
        this.longitude = json.longitude;
        this.latitude = json.latitude;
        this.name = json.name;

        return this;
    }

    get asJson() {
        return {
            id: this.id,
            longitude: this.longitude,
            latitude: this.latitude,
            name: this.name,
        };
    }
}
