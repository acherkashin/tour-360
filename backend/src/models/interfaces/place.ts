import { Tour } from './../interfaces/tour';
import { Connection, ConnectionDetailDto } from './../interfaces/connection';

interface PlaceDto {
    readonly id: string;
    name: string;
    latitude: number;
    longitude: number;
    hasImage360: boolean;
    image360Width: number;
    image360Height: number;
    image360Name: string;
}

interface PlaceDetailDto {
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
    widgets: any[];
    description: string;
}

interface Place {
    id: string;
    name: string;
    longitude: number;
    latitude: number,
    sound: {
        filename: string,
        contentType: string,
    },

    toClient: () => PlaceDto;
    toDetailDto: (tour: Tour) => PlaceDetailDto;
}

export {
    Place,
    PlaceDto,
    PlaceDetailDto,
};
