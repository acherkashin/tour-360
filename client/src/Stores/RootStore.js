import UserStore from './UserStore';
import TourStore from './TourStore';
import TourEditStore from './TourEditStore';

export default class RootStore {
    constructor() {
        this.userStore = new UserStore();
        this.tourStore = new TourStore();
        this.tourEditStore = new TourEditStore();
    }
}