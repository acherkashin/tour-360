import { decorate, observable, computed, action } from "mobx";

class Tour {
    readonly id: string;
    readonly store: any;
    name: string = '';
    hasImage: boolean = false;
    filename: string = '';
    startPlaceId: string;

    private imageHash: number = Date.now();

    constructor(store: any, id: string) {
        this.id = id;
        this.store = store;
    }

    get imageUrl() {
        return this.hasImage ? `/${this.filename}?${this.imageHash}` : `/src/no-image.png`;
    }

    updateFromJson(json) {
        this.name = json.name;
        this.hasImage = json.hasImage;
        this.filename = json.filename;
        this.startPlaceId = json.startPlaceId;
    }

    refreshCover() {
        this.imageHash = Date.now();
    }
}

//TODO: cast to any to escape conflict with typings
decorate(Tour, <any>{
    name: observable,
    hasImage: observable,
    filename: observable,
    imageHash: observable,
    imageUrl: computed,
    refreshCover: action
});

export default Tour;