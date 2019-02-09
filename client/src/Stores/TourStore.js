import { extendObservable, action, observable } from 'mobx';
import { TourService } from './../api';
import Tour from './Tour';

export default class TourStore {
    constructor() {
        extendObservable(this, {
            tours: observable.array([]),
        });
    }

    getById(id) {
        return TourService.getById(id).then((resp) => {
            return this.updateTourFromServer(resp.data.result);
        });
    }

    loadTours = action(() => {
        TourService.getAll().then(action((resp) => {
            this.tours = (resp.data.result || []).map(tour => this.updateTourFromServer(tour));
        }));
    });

    updateTourFromServer = action((json) => {
        let tour = this.tours.find(tour => tour.id === json.id);
        if (!tour) {
            tour = new Tour(this, json.id);
            this.tours.push(tour);
        }

        tour.updateFromJson(json);

        return tour;
    });

    updateCover = action((id, file) => {
        return TourService.uploadCover(id, file).then(() => {
            const tour = this.tours.find(tour => tour.id === id);
            tour.refreshCover();
        });
    });
}