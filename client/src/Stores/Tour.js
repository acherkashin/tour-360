import { extendObservable } from "mobx";

export default class Tour {
    constructor(store, id) {
        this.store = store;
        this.id = id;

        extendObservable(this, {
            name: '',
            hasImage: false,
            imageHash: Date.now(),
            get imageUrl() {
                return this.hasImage ? `/api/tour/${this.id}/cover?${this.imageHash}` : `/src/no-image.png`;
            }
        });
    }

    updateFromJson(json) {
        this.name = json.name;
        this.hasImage = json.hasImage;
    }

    refreshCover() {
        this.imageHash = Date.now();
    }
}
