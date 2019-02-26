import { extendObservable } from "mobx";

export default class Tour {
    constructor(store, id) {
        this.store = store;
        this.id = id;

        extendObservable(this, {
            name: '',
            hasImage: false,
            filename: '',
            imageHash: Date.now(),
            get imageUrl() {
                return this.hasImage ? `/${this.filename}?${this.imageHash}` : `/src/no-image.png`;
            }
        });
    }

    updateFromJson(json) {
        this.name = json.name;
        this.hasImage = json.hasImage;
        this.filename = json.filename;
    }

    refreshCover() {
        this.imageHash = Date.now();
    }
}
