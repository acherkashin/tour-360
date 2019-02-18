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
            get mapImageUrl() {
                return this.hasMapImage ? `/api/tour-edit/${this.sessionId}/mapImage?${this.imageHash}` : `/src/no-image.png`;
            }
        });

        this.updateFromJson(json);
    }

    updateFromJson(json) {
        this.name = json.name;
        this.mapType = json.mapType;
        this.hasMapImage = json.hasMapImage;
    }

    refreshCover() {
        this.imageHash = Date.now();
    }
}
