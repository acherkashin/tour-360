import {
    UserStore,
    TourStore,
    TourEditStore,
    ViewTourStore,
    PlaceEditStore,
} from "./";

export default class RootStore {
    constructor() {
        this.userStore = new UserStore(this);
        this.tourStore = new TourStore(this);
        this.tourEditStore = new TourEditStore(this);
        this.viewTourStore = new ViewTourStore(this);
        this.placeEditStore = new PlaceEditStore(this);
    }
}
