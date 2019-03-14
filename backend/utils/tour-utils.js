exports.getPlace = function (tour, placeId) {
    const index = tour.places.findIndex((value) => value.id === placeId);
    const place = tour.places[index];

    return place;
}
