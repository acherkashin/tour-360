import mongoose from "mongoose";
import { Place, Tour, TourDetailDto, PlaceDetailDto } from "./interfaces";
// const Widget = new mongoose.Schema({
//     type: { type: String, required: true },
// });

const PlaceSchema = new mongoose.Schema<Place>({
    name: { type: String, required: true },
    longitude: { type: Number, required: true, default: 0 },
    latitude: { type: Number, required: true, default: 0 },
    sound: { filename: String, contentType: String },
    image360: {
        filename: String,
        contentType: String,
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
    },
    mapIcon: {
        filename: String,
        contentType: String,
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
    },
    description: { type: String, default: '' },
    widgets: [Object],
});

PlaceSchema.methods.getWidget = function (widgetId) {
    const widget = (this.widgets || []).find(widget => widget.id === widgetId);
    return widget;
};

PlaceSchema.methods.toClient = function () {
    const dto = {
        id: this.id,
        name: this.name,
        latitude: this.latitude,
        longitude: this.longitude,
        hasImage360: this.image360 && this.image360.filename != null,
        image360Width: this.image360 && this.image360.width,
        image360Height: this.image360 && this.image360.height,
        image360Name: this.image360 && this.image360.filename,
    };

    return dto;
};

PlaceSchema.methods.toDetailDto = function (tour: Tour): PlaceDetailDto {
    const starts = (tour.connections || []).filter(c => c.startPlaceId === this.id).map(c => c.endAsDestination(tour));
    const ends = (tour.connections || []).filter(c => c.endPlaceId === this.id).map(c => c.startAsDestination(tour));

    //TODO: remove it
    const temporWidgets = [{
        id: '1',
        type: 'text',
        x: 0,
        y: 0,
        content: "Hello world!",
    }, {
        id: '2',
        type: 'text',
        x: 1000,
        y: 100,
        content: "Hello world!",
    }];

    const dto = {
        id: this.id,
        name: this.name,
        latitude: this.latitude,
        longitude: this.longitude,
        hasImage360: this.image360 && this.image360.filename != null,
        image360Width: this.image360 && this.image360.width,
        image360Height: this.image360 && this.image360.height,
        image360Name: this.image360 && this.image360.filename,
        mapIcon: this.mapIcon,
        soundName: this.sound && this.sound.filename,
        connections: [...starts, ...ends],
        widgets: this.widgets || temporWidgets,
        description: this.description,
    };

    return dto;
};

export default PlaceSchema;
