import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { blue, green, red } from '@material-ui/core/colors';
import { CircleMarker, Tooltip, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface PlaceProps {
    place: any;
    onClick: (e: { origin: Place, place: any, lEvent: any }) => void;
    onDragend: (e: { origin: Place, place: any, latitude: number, longitude: number }) => void;
    isSelected: boolean;
    isStart: boolean;
}

const icon = L.icon({
    iconUrl: '/src/marker-icon.png',
    iconSize: [25, 41],
});

export default class Place extends Component<PlaceProps, any> {
    refmarker = createRef<Marker>()

    static propTypes = {
        onClick: PropTypes.func.isRequired,
        place: PropTypes.shape({
            id: PropTypes.string.isRequired,
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
        }),
        isSelected: PropTypes.bool.isRequired,
    };

    render() {
        const { place, isSelected, isStart, onClick, onDragend } = this.props;
        const radius = 20;

        const startFillColor = green[500];
        const defaultFillColor = blue[500];
        const fillColor = isStart ? startFillColor : defaultFillColor;

        const selectedColor = red[500];

        return (<Marker
            draggable={true}
            icon={icon}
            key={place.id}
            position={[place.latitude, place.longitude]}
            onclick={(e) => {
                onClick && onClick({
                    origin: this,
                    place,
                    lEvent: e,
                });
            }}
            onDragend={e => {
                const marker = this.refmarker.current
                const position = marker.leafletElement.getLatLng();

                onDragend && onDragend({
                    origin: this,
                    place,
                    latitude: position.lat,
                    longitude: position.lng,
                });
            }}
            ref={this.refmarker}
        >
            <Tooltip permanent direction='bottom' offset={[0, radius]}>
                <span>{place.name}</span>
            </Tooltip>
        </Marker>);
    }
}
