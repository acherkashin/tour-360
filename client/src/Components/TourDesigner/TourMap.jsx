import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Map, TileLayer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { Connection, Place, } from './';

const styles = theme => ({
    root: {
        flex: 1
    }
});

class TourMap extends React.Component {
    constructor(props) {
        super(props);

        this._handleMapClick = this._handleMapClick.bind(this);
        this._handleMouseMove = this._handleMouseMove.bind(this);
        this._handleZoomChanged = this._handleZoomChanged.bind(this);
        this._handleConnectionClick = this._handleConnectionClick.bind(this);
        this._handlePlaceClick = this._handlePlaceClick.bind(this);
    }

    _handleMapClick(e) {
        this.props.onClick && this.props.onClick({
            origin: this,
            latlng: e.latlng,
        });
    }

    _handleMouseMove(e) {
        this.props.onMouseMove && this.props.onMouseMove({
            origin: this,
            latlng: e.latlng,
        });
    }

    _handleZoomChanged(e) {
        this.props.onZoomChanged && this.props.onZoomChanged({
            origin: this,
            zoom: e.target._zoom,
        });
    }

    _handleConnectionClick(e) {
        // prevent map click event
        L.DomEvent.stopPropagation(e.lEvent);

        this.props.onConnectionClick && this.props.onConnectionClick({
            origin: this,
            connection: e.connection,
        });
    }

    _handlePlaceClick(e) {
        // prevent map click event
        L.DomEvent.stopPropagation(e.lEvent);

        this.props.onPlaceClick && this.props.onPlaceClick({
            origin: this,
            place: e.place,
        });
    }

    _renderMapContent() {
        const { tour, selectedPlaceId } = this.props;
        const places = tour.places || [];
        const connections = tour.connections || [];

        return <>
            {connections.map(c => {
                const isSelected = ((this.editingConnection) && c.id === this.editingConnection.id) || false;

                return <Connection
                    key={c.id}
                    isSelected={isSelected}
                    connection={c}
                    onClick={this._handleConnectionClick}
                />;
            })}
            {places.map(place => {
                const isSelected = place.id === selectedPlaceId;
                const isStart = tour.startPlaceId === place.id;

                return <Place key={place.id}
                    place={place}
                    isSelected={isSelected}
                    isStart={isStart}
                    onClick={this._handlePlaceClick} />;
            })}
        </>;
    }

    render() {
        const { classes, tour, style } = this.props;

        if (tour.mapType === "Image") {
            const bounds = [[0, 0], [tour.imageHeight, tour.imageWidth]];

            return <Map crs={L.CRS.Simple}
                bounds={bounds}
                className={classes.root}
                style={style}
                onclick={this._handleMapClick}
                onmousemove={this._handleMouseMove}
                onzoomend={this._handleZoomChanged}>
                <ImageOverlay url={tour.mapImageUrl} bounds={bounds} />
                {this._renderMapContent()}
            </Map>;
        } else if (tour.mapType === "Earth") {
            const state = {
                position: [0, 0],
                zoom: 5,
            };

            return (
                <Map center={state.position}
                    zoom={state.zoom}
                    className={classes.root}
                    style={style}
                    onclick={this._handleMapClick}
                    onmousemove={this._handleMouseMove}
                    onzoomend={this._handleZoomChanged}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this._renderMapContent()}
                </Map>
            );
        }
    }
}

TourMap.propTypes = {
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    selectedPlaceId: PropTypes.string,
    tour: PropTypes.shape(PropTypes.shape({
        places: PropTypes.array.isRequired,
        connections: PropTypes.array.isRequired,
        mapType: PropTypes.oneOf('Earth', 'Image').isRequired,
    })).isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onZoomChanged: PropTypes.func.isRequired,
    onPlaceClick: PropTypes.func.isRequired,
    onConnectionClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(TourMap);