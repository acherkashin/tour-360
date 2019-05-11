import { extendObservable, decorate, observable, computed } from "mobx";
import {
    ConnectionDetailDto,
    PlaceDetailDto,
} from "./../../../../backend/src/models/interfaces";

class EditPlace {
    readonly id: string;
    name: string;
    longitude: number;
    latitude: number;
    hasImage360: boolean;
    image360Width: number;
    image360Height: number;
    image360Name: string;
    connections: ConnectionDetailDto[] = [];

    description: string;
    widgets: any[];
    soundName: string;

    soundHash: number;
    image360Hash: number;

    constructor(json) {
        this.id = json.id;
    
    this.updateFromJson(json);
    }

    get viewImage360Url() {
        throw new Error('not implemented');
        // return this.hasImage360 ? this.store.getPlaceImage360Url(this.id) : null;
    }
    get mapImage360Url() {
        return this.hasImage360 ? `/${this.image360Name}?${this.image360Hash}` : null;
    }
    get soundUrl() {
        return this.soundName ? `/${this.soundName}?${this.soundHash}` : null;
    }

    updateFromJson(json: PlaceDetailDto) {
        this.name = json.name;
        this.longitude = json.longitude;
        this.latitude = json.latitude;
        this.hasImage360 = json.hasImage360;
        this.image360Width = json.image360Width;
        this.image360Height = json.image360Height;
        this.image360Name = json.image360Name;
        this.connections = json.connections;
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
            soundName: this.soundName,
            description: this.description,
            widgets: this.widgets,
        };
    }

    refreshSound() {
        this.soundHash = Date.now();
    }
}

decorate(EditPlace, <any>{
    name: observable,
    longitude: observable,
    latitude: observable,
    hasImage360: observable,
    image360Width: observable,
    image360Height: observable,
    image360Name: observable,
    connections: observable,
    description: observable,
    widgets: observable,
    soundName: observable,

    soundHash: observable,
    image360Hash: observable,
    
    viewImage360Url: computed,
    mapImage360Url: computed,
    soundUrl: computed,
});

export default EditPlace;
