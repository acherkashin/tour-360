import { VR_URL } from './../config';

export function getPanoUrl(tourId, placeId, token) {
    return `${VR_URL}?tourId=${tourId}&placeId=${placeId}&token=${token}`;
}
