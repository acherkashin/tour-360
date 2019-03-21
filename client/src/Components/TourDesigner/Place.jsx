import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import { CircleMarker, Tooltip } from 'react-leaflet';

export default class Place extends Component {
    render() {
        const { place, onClick, isSelected } = this.props;
        const radius = 20;
        const fillColor = isSelected ? green[500] : blue[500];

        return (<CircleMarker
            key={place.id}
            center={[place.latitude, place.longitude]}
            radius={radius}
            fillColor={fillColor}
            fillOpacity={1}
            onClick={(e) => {
                onClick && onClick({
                    origin: this,
                    place,
                    lEvent: e,
                });
            }}
        >
            <Tooltip permanent direction='bottom' offset={[0, radius]}>
                <span>{place.name}</span>
            </Tooltip>
        </CircleMarker>);
    }
}

Place.propTypes = {
    onClick: PropTypes.func.isRequired,
    place: PropTypes.shape({
        id: PropTypes.string.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }),
    isSelected: PropTypes.bool.isRequired,
};
