import { extendObservable } from "mobx";

export default class EditPlace {
    constructor(json) {
        this.id = json.id;

        extendObservable(this, {
            longitude: null,
            latitude: null,
            name: '',

            hasImage360: false,
            image360Hash: Date.now(),
            soundHash: Date.now(),
            image360Width: 0,
            image360Height: 0,
            image360Name: '',
            connections: [],
            startPlaceId: null,
            soundName: '',
            description: '',
            widgets: [],

            get viewImage360Url() {
                return this.hasImage360 ? this.store.getPlaceImage360Url(this.id) : null;
            },
            get mapImage360Url() {
                return this.hasImage360 ? `/${this.image360Name}?${this.image360Hash}` : null;
            },
            get soundUrl() {
                return this.soundName ? `/${this.soundName}?${this.soundHash}` : null;
            }
        });

        this.updateFromJson(json);
    }

    updateFromJson(json) {
        this.name = json.name;
        this.longitude = json.longitude;
        this.latitude = json.latitude;
        this.hasImage360 = json.hasImage360;
        this.image360Width = json.image360Width;
        this.image360Height = json.image360Height;
        this.image360Name = json.image360Name;
        this.connections = json.connections;
        this.startPlaceId = json.startPlaceId;
        this.description = json.description;
        this.widgets = json.widgets;

        if (this.soundName !== json.soundName) {
            this.soundName = json.soundName;
            this.refreshSound();
        }

        return this;
    }

    get asJson() {
        return {
            id: this.id,
            longitude: this.longitude,
            latitude: this.latitude,
            name: this.name,
            startPlaceId: this.startPlaceId,
            soundName: this.soundName,
            description: this.description,
            widgets: this.widgets,
        };
    }

    refreshSound() {
        this.soundHash = Date.now();
    }
}
