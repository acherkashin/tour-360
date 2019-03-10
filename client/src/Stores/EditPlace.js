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

            hasImage360: false,
            image360Hash: Date.now(),
            image360Width: 0,
            image360Height: 0,
            image360Name: '',

            get mapImage360Url() {
                return this.hasImage360 ? `/${this.image360Name}?${this.image360Hash}` : null;
            }
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
