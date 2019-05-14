import {
    BaseWidget,
    ConnectionDetailDto,
    Tour,
    ImageFile,
} from './../interfaces';
import { Document } from 'mongoose';

export interface PlaceDto {
    readonly id: string;
    name: string;
    latitude: number;
    longitude: number;
    hasImage360: boolean;
    image360Width: number;
    image360Height: number;
    image360Name: string;
}

export interface PlaceDetailDto {
    readonly id: string;
    name: string;
    latitude: number;
    longitude: number;
    hasImage360: boolean;
    image360Width: number;
    image360Height: number;
    image360Name: string;
    soundName: string;
    connections: ConnectionDetailDto[];
    widgets: BaseWidget[];
    description: string;
    mapIcon: ImageFile;
}

export interface Place extends Document {
    id: string;
    name: string;
    longitude: number;
    latitude: number,
    sound?: {
        filename: string,
        contentType: string,
    },
    image360?: ImageFile;
    mapIcon?: ImageFile;
    widgets?: BaseWidget[];
    description?: string;

    toClient: () => PlaceDto;
    toDetailDto: (tour: Tour) => PlaceDetailDto;
}
