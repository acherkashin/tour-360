import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircleMarker } from 'react-leaflet';

export default class Place extends Component {
    render() {
        const { place, onClick } = this.props;

        return (<CircleMarker
            key={place.id}
            center={[place.latitude, place.longitude]}
            radius={20}
            fillColor={'blue'}
            fillOpacity={1}
            onClick={(e) => {
                onClick && onClick({
                    origin: this,
                    place,
                    lEvent: e,
                });
            }}
        />);
    }
}

Place.propTypes = {
    onClick: PropTypes.func.isRequired,
    place: PropTypes.shape({
        id: PropTypes.string.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }),
};
