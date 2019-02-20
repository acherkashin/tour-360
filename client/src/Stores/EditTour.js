import { extendObservable } from "mobx";

export default class EditTour {
    constructor(store, sessionId, json) {
        this.store = store;
        this.sessionId = sessionId;
        this.id = json.id;

        extendObservable(this, {
            name: '',
            mapType: '',
            hasMapImage: false,
            imageHash: Date.now(),
            imageWidth: 0,
            imageHeight: 0,
            get mapImageUrl() {
                return this.hasMapImage ? `/api/tour-edit/${this.sessionId}/mapImage?${this.imageHash}` : null;
            }
        });

        this.updateFromJson(json);
    }

    updateFromJson(json) {
        this.name = json.name;
        this.mapType = json.mapType;
        this.hasMapImage = json.hasMapImage;
        this.imageWidth = json.imageWidth || 0;
        this.imageHeight = json.imageHeight || 0;
    }

    refreshCover() {
        this.imageHash = Date.now();
    }
}