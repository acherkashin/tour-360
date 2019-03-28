import UserStore from './UserStore';
import TourStore from './TourStore';

export default class RootStore {
    constructor() {
        this.userStore = new UserStore();
        this.tourStore = new TourStore();
    }
}