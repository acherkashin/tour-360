import { ImageFile, Place, PlaceDto, PlaceDetailDto, Connection, ConnectionDto, MapType } from './';
import { Document } from "mongoose";

export interface TourDto {
    readonly id: string;
    name: string;
    mapType: MapType;
    hasImage: boolean;
    filename?: string;
    startPlaceId?: string;
    isPublic: boolean;
    places: PlaceDto[];
    // author: string;
}

export interface TourDetailDto {
    id: string;
    name: string;
    places: PlaceDetailDto[];
    connections: ConnectionDto[];
    mapType: MapType;
    hasMapImage: boolean;
    imageWidth: number;
    imageHeight: number;
    filename: string;
    startPlaceId: string;
    isPublic: boolean;
    cover: ImageFile;
}

export interface Tour extends Document {
    name: string;
    startPlaceId: string;
    cover: ImageFile;
    mapImage: ImageFile;
    mapType: MapType;
    places: Place[];
    connections: Connection[];
    createdBy: any;
    isPublic: boolean;

    toClient: () => TourDto;
    updateTour: (dto: TourDetailDto) => void;
    hasConnection: (strtPlaceId: string, endPlaceId: string) => boolean;
    deleteConnection: (place1Id: string, place2Id: string) => void;
    getConnectionById: (id: string) => Connection;
    getPlace: (id: string) => Place;
    updatePlace: (dto: PlaceDetailDto) => void;
    deletePlace: (placeId: string) => void;
    toDetailDto: () => TourDetailDto;
}
