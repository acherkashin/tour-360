import { decorate, observable, action, computed } from "mobx";
import {
    ImageFile,
    ConnectionDto,
    PlaceDetailDto,
    MapType,
    TourDetailDto,
} from "./../../../../backend/src/models/interfaces";

class TourDetail {
    readonly id: string;
    name: string;
    filename: string;
    mapType: MapType;
    hasMapImage: boolean;
    imageWidth: number;
    imageHeight: number;
    places: PlaceDetailDto[];
    connections: ConnectionDto[];
    startPlaceId: string;
    isPublic: boolean;

    imageHash: number;
    coverImageHash: number;
    cover: ImageFile;

    constructor(json: TourDetailDto) {
        this.id = json.id;

        this.updateFromJson(json);
    }

    get mapImageUrl() {
        return this.hasMapImage ? `/${this.filename}?${this.imageHash}` : null;
    }

    get imageUrl() {
        return this.cover && this.cover.filename ? `/${this.cover.filename}?${this.coverImageHash}` : null;
    }

    getPlace(placeId: string): PlaceDetailDto {
        const place = (this.places || []).find(place => place.id === placeId);
        return place;
    }

    getConnectionsByPlaceId(placeId: string) {
        const connections = (this.connections || []).filter(item => item.startPlace.id === placeId || item.endPlace.id === placeId);
        return connections;
    }

    updateFromJson(json: TourDetailDto) {
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
        this.cover = json.cover;
    }

    updatePlaceFromJson(json: PlaceDetailDto) {
        const place = this.getPlace(json.id);

        if (place) {
            place.longitude = json.longitude;
            place.latitude = json.latitude;
            place.name = json.name;

            this.updateConnectionsFromPlace(json);
        }

        return place;
    }

    updateConnectionsFromPlace(json: PlaceDetailDto) {
        const connections = this.getConnectionsByPlaceId(json.id);

        if (connections && connections.length > 0) {
            (connections || []).forEach((item) => {
                if (item.startPlace.id === json.id) {
                    item.startPlace.longitude = json.longitude;
                    item.startPlace.latitude = json.latitude;
                } else if (item.endPlace.id === json.id) {
                    item.endPlace.longitude = json.longitude;
                    item.endPlace.latitude = json.latitude;
                }
            });
        }
    }

    updateConnectionFromJson(json: ConnectionDto) {
        const connection = (this.connections || []).find(c => c.id === json.id);

        if (connection) {
            connection.startPlacePosition = json.startPlacePosition;
            connection.endPlacePosition = json.endPlacePosition;
        }

        return connection;
    }

    hasConnection(startPlaceId: string, endPlaceId: string) {
        const connection = (this.connections || []).some(c =>
            (c.startPlace.id === startPlaceId && c.endPlace.id === endPlaceId) ||
            (c.startPlace.id === endPlaceId && c.endPlace.id === startPlaceId)
        );

        return connection;
    }

    refreshImageMap() {
        this.imageHash = Date.now();
    }

    refreshCover() {
        this.imageHash = Date.now();
    }
}

decorate(TourDetail, {
    name: observable,
    filename: observable,
    mapType: observable,
    hasMapImage: observable,
    imageWidth: observable,
    imageHeight: observable,
    places: observable,
    connections: observable,
    startPlaceId: observable,
    isPublic: observable,
    imageHash: observable,
    cover: observable,

    updateFromJson: action,
    updateConnectionFromJson: action,
    updatePlaceFromJson: action,

    mapImageUrl: computed,
});

export default TourDetail;
