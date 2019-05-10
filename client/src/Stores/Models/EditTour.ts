import { extendObservable } from "mobx";

export default class EditTour {
    readonly id: string;
    readonly store: any;
    name: string;
    filename: string;
    mapType: any;
    hasMapImage: boolean;
    imageWidth: number;
    imageHeight: number;
    places: any[];
    connections: any[];
    startPlaceId: string;
    isPublic: boolean;
    connection: any[];
    
    private imageHash: number;

    constructor(store, json) {
        this.store = store;
        this.id = json.id;

        extendObservable(this, {
            name: '',
            mapType: '',
            filename: '',
            places: [],
            connections: [],
            hasMapImage: false,
            imageHash: Date.now(),
            imageWidth: 0,
            imageHeight: 0,
            startPlaceId: '',
            isPublic: false,
            get mapImageUrl() {
                return this.hasMapImage ? `/${this.filename}?${this.imageHash}` : null;
            },
        });

        this.updateFromJson(json);
    }

    updateFromJson(json) {
        this.name = json.name;
        this.filename = json.filename;
        this.mapType = json.mapType;
        this.hasMapImage = json.hasMapImage;
        this.imageWidth = json.imageWidth || 0;
        this.imageHeight = json.imageHeight || 0;
        this.places = json.places || [];
        this.connections = json.connections || [];
        this.startPlaceId = json.startPlaceId;
        this.isPublic = json.isPublic;
    }

    updatePlaceFromJson(json) {
        const place = (this.places || []).find(place => place.id === json.id);

        if (place) {
            place.longitude = json.longitude;
            place.latitude = json.latitude;
            place.name = json.name;
        }

        return place;
    }

    updateConnectionFromJson(json) {
        const connection = (this.connection || []).find(c => c.id === json.id);

        if (connection) {
            connection.startPlacePosition = json.startPlacePosition;
            connection.endPlacePosition = json.endPlacePosition;
        }

        return connection;
    }

    hasConnection(startPlaceId, endPlaceId) {
        const connection = (this.connections || []).some(c =>
            (c.startPlace.id === startPlaceId && c.endPlace.id === endPlaceId) ||
            (c.startPlace.id === endPlaceId && c.endPlace.id === startPlaceId)
        );

        return connection;
    }

    refreshCover() {
        this.imageHash = Date.now();
    }
}
