import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Map, TileLayer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import EditTourPanel from './EditTourPanel';
import { observer, inject } from 'mobx-react';
import grey from '@material-ui/core/colors/grey';

const styles = {
    appBar: {
        position: 'relative',
    },
    tourName: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    noImageMap: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    mapWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
    },
    rightPanel: {
        flexBasis: 400,
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
    value: {

    }
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const TourDesigner = inject("tourStore")(observer(class TourDesigner extends React.Component {
    constructor(props) {
        super(props);

        this._handleSave = this._handleSave.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleMapClick = this._handleMapClick.bind(this);
        this._handleNameChanged = this._handleNameChanged.bind(this);
        this._handleMapImageUploaded = this._handleMapImageUploaded.bind(this);
        this._handleMouseMoveOnMap = this._handleMouseMoveOnMap.bind(this);
        this._handleZoomChanged = this._handleZoomChanged.bind(this);
    }

    state = {
        currentLat: 0,
        currentLng: 0,
        currentZoom: 0,
    };

    get tourStore() {
        return this.props.tourStore;
    }

    get editingTour() {
        return this.props.tourStore.editingTour;
    }

    get sessionId() {
        return this.props.tourStore.sessionId;
    }

    _handleMouseMoveOnMap(e) {
        this.setState({ currentLat: e.latlng.lat, currentLng: e.latlng.lng });
    }

    _handleZoomChanged(e) {
        this.setState({ currentZoom: e.target._zoom });
    }

    _handleClose() {
        this.tourStore.cancelEditing();
        // this.props.onClose && this.props.onClose({ origin: this });
    }

    _handleSave() {
        this.tourStore.saveEditing();
        // .then(() => {
        //     this.props.onSave && this.props.onSave({ origin: this });
        // });
    }

    _handleNameChanged(e) {
        console.log(e);
        this.editingTour.name = e.name;
    }

    _handleMapClick(e) {
        console.log(e);
    }

    _renderMap() {
        const { classes } = this.props;
        
        if (this.editingTour.hasMapImage) {
            if (this.editingTour.mapType === 'Earth') {
                return this._renderEarthMap()
            }
            if (this.editingTour.mapType === 'Image') {
                return this._renderImageMap()
            }
        } else {
            return (<div className={classes.noImageMap}>
                <Typography>Image for map is not selected</Typography>
            </div>);
        }
    }

    _renderImageMap() {
        const { classes } = this.props;
        const bounds = [[0, 0], [this.editingTour.imageHeight, this.editingTour.imageWidth]];

        return (<div className={classes.mapWrapper}>
            <Map crs={L.CRS.Simple}
                bounds={bounds}
                className={classes.map}
                onmousemove={this._handleMouseMoveOnMap}
                onzoomend={this._handleZoomChanged}>
                <ImageOverlay url={this.editingTour.mapImageUrl} bounds={bounds} />
            </Map>
            {this._renderStatusBar()}
        </div>);
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

    _handleMapImageUploaded(e) {
        return this.tourStore.updateImageMap(e.file, e.width, e.height);
    }

    _renderEarthMap() {
        const { classes } = this.props;
        const state = {
            position: [0, 0],
            zoom: 13,
        };

        return (
            <Map
                center={state.position}
                zoom={state.zoom}
                className={classes.map}
                onclick={this._handleMapClick}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Circle center={position} radius={30} fill={true}>
                    <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
                </Circle> */}
            </Map>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog
                open={true}
                fullScreen
                onClose={this._handleClose}
                TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this._handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.tourName}>{this.editingTour.name}</Typography>
                        <Button color="inherit" onClick={this._handleSave}>save</Button>
                    </Toolbar>
                </AppBar>
                <div className={classes.content}>
                    {this._renderMap()}
                    {!this.editingTour.mapType && <Typography className={classes.map}>Map type is not defined</Typography>}
                    <EditTourPanel
                        tour={this.editingTour}
                        onNameChanged={this._handleNameChanged}
                        onMapImageUploadClick={this._handleMapImageUploaded}
                    />
                </div>

            </Dialog>
        );
    }
}));

TourDesigner.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(TourDesigner);
