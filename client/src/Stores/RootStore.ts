import {
    UserStore,
    TourStore,
    TourEditStore,
    ViewTourStore,
    PlaceEditStore,
} from ".";

export default class RootStore {
    userStore = new UserStore(this);
    tourStore = new TourStore(this);
    tourEditStore = new TourEditStore(this);
    viewTourStore = new ViewTourStore(this);
    placeEditStore = new PlaceEditStore(this);
}
