import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Map, TileLayer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { Connection, Place, } from './';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
    },
    map: {
        flex: 1,
    },
    statusBar: {
        borderTop: `1px solid ${grey[300]}`,
        padding: 3,
    },
    field: {
        marginLeft: 5,
    },
    lable: {
        fontWeight: 700,
        marginRight: 5,
    },
    value: {}
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

    state = {
        currentLat: 0,
        currentLng: 0,
        currentZoom: 0,
    }

    _handleMapClick(e) {
        this.props.onClick && this.props.onClick({
            origin: this,
            latlng: e.latlng,
        });
    }

    _handleMouseMove(e) {
        this.setState({ currentLat: e.latlng.lat, currentLng: e.latlng.lng });

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

    _renderMap() {
        const { classes, tour, mapStyle } = this.props;

        if (tour.mapType === 2) {
            const bounds = [[0, 0], [tour.imageHeight, tour.imageWidth]];

            return <Map crs={L.CRS.Simple}
                bounds={bounds}
                className={classes.map}
                style={mapStyle}
                onclick={this._handleMapClick}
                onmousemove={this._handleMouseMove}
                onzoomend={this._handleZoomChanged}>
                <ImageOverlay url={tour.mapImageUrl} bounds={bounds} />
                {this._renderMapContent()}
            </Map>;
        } else if (tour.mapType === 1) {
            const state = {
                position: [0, 0],
                zoom: 5,
            };

            return (
                <Map center={state.position}
                    zoom={state.zoom}
                    className={classes.map}
                    style={mapStyle}
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

    _renderStatusBar() {
        const { classes } = this.props;
        const { currentLng, currentLat, currentZoom } = this.state;

        return (
            <div className={classes.statusBar}>
                <span className={classes.field}>
                    <span className={classes.lable}>X:</span>
                    <span className={classes.value}>{parseInt(currentLng)}</span>
                </span>
                <span className={classes.field}>
                    <span className={classes.lable}>Y:</span>
                    <span className={classes.value}>{parseInt(currentLat)}</span>
                </span>
                <span className={classes.field}>
                    <span className={classes.lable}>Z:</span>
                    <span className={classes.value}>{parseInt(currentZoom)}</span>
                </span>
            </div>
        )
    }

    render() {
        const { classes } = this.props;

        return <div className={classes.root}>
            {this._renderMap()}
            {this._renderStatusBar()}
        </div>;
    }
}

TourMap.propTypes = {
    classes: PropTypes.object.isRequired,
    mapStyle: PropTypes.object,
    selectedPlaceId: PropTypes.string,
    tour: PropTypes.shape({
        places: PropTypes.array.isRequired,
        connections: PropTypes.array.isRequired,
        mapType: PropTypes.number.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
    onMouseMove: PropTypes.func,
    onZoomChanged: PropTypes.func,
    onPlaceClick: PropTypes.func,
    onConnectionClick: PropTypes.func,
}

export default withStyles(styles)(TourMap);