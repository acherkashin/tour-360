import { decorate, observable, computed, action } from "mobx";
import {
    ConnectionDetailDto,
    PlaceDetailDto,
    BaseWidget,
    ImageFile,
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
    mapIcon: ImageFile;

    description: string;
    widgets: BaseWidget[];
    soundName: string;

    soundHash: number;
    image360Hash: number;
    mapIconHash: number;

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
    get mapIconUrl() {
        return this.mapIcon && this.mapIcon.filename ? `/${this.mapIcon.filename}?${this.mapIconHash}` : null;
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
        this.mapIcon = json.mapIcon;

        if (this.soundName !== json.soundName) {
            this.soundName = json.soundName;
            this.refreshSound();
        }

        const oldImage = this.mapIcon && this.mapIcon.filename;
        const newImage = json.mapIcon && json.mapIcon.filename;
        if (oldImage !== newImage) {
            this.refreshMapIcon()
        }

        if(this.image360Name !== json.image360Name) {
            this.refreshPano();
        }

        return this;
    }

    get asJson(): PlaceDetailDto {
        return {
            id: this.id,
            longitude: this.longitude,
            latitude: this.latitude,
            name: this.name,
            soundName: this.soundName,
            description: this.description,
            widgets: this.widgets,
            connections: this.connections,
            hasImage360: this.hasImage360,
            image360Name: this.image360Name,
            image360Height: this.image360Height,
            image360Width: this.image360Width,
            mapIcon: this.mapIcon,
        };
    }

    getWidget(id: string) {
        const widget = this.widgets.find(w => w.id === id);
        return widget;
    }

    refreshSound() {
        this.soundHash = Date.now();
    }

    refreshMapIcon() {
        this.mapIconHash = Date.now();
    }

    refreshPano() {
        this.image360Hash = Date.now();
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
    mapIcon: observable,

    soundHash: observable,
    image360Hash: observable,
    mapIconHash: observable,

    viewImage360Url: computed,
    mapImage360Url: computed,
    soundUrl: computed,
    mapIconUrl: computed,

    updateFromJson: action,
});

export default EditPlace;
