import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
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
import grey from '@material-ui/core/colors/grey';
import EditTourPanel from './EditTourPanel';
import EditConnectionPanel from './EditConnectionPanel';
import MapEditMode from './MapEditMode';
import { PlaceholderButton } from './../';
import { UploadImageDialog, ConfirmDialog } from './../Dialogs';
import Place from './Place';
import Connection from './Connection';
import { DRAG_MAP, ADD_PLACE, REMOVE_PLACE, ADD_CONNECTION } from './Modes';
import EditPlacePanel from './EditPlacePanel';
import ViewUrlDialog from '../Dialogs/ViewUrlDialog';

const styles = (theme) => ({
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
    noImageMapPlaceholder: {
        color: grey[700],
        fontSize: '24px',
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
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 500,
        minWidth: 400,
        flexBasis: 400,
        backgroundColor: grey[100],
        borderLeft: `1px solid ${theme.palette.divider}`,
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

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const CLOSED = 0;
const TOUR_MAP = 1;
const PLACE_360 = 2;

const TourDesigner = inject("rootStore")(observer(class TourDesigner extends React.Component {
    constructor(props) {
        super(props);

        this._handleSave = this._handleSave.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleMapClick = this._handleMapClick.bind(this);
        this._handleNameChanged = this._handleNameChanged.bind(this);
        this._handlePlaceNameChanged = this._handlePlaceNameChanged.bind(this);
        this._handleChangePlaceImage360Click = this._handleChangePlaceImage360Click.bind(this);
        this._handleMouseMoveOnMap = this._handleMouseMoveOnMap.bind(this);
        this._handleZoomChanged = this._handleZoomChanged.bind(this);
        this._handleChangeImageMapClick = this._handleChangeImageMapClick.bind(this);
        this._handleFileSelected = this._handleFileSelected.bind(this);
        this._handleModeChanged = this._handleModeChanged.bind(this);
        this._handlePlaceClick = this._handlePlaceClick.bind(this);
        this._handleViewImage360Click = this._handleViewImage360Click.bind(this);
        this._handleConnectionClick = this._handleConnectionClick.bind(this);
        this._handleStartPlaceChanged = this._handleStartPlaceChanged.bind(this);

        this._handleOkConfirmClick = this._handleOkConfirmClick.bind(this);
        this._handleCancelConfigrmClick = this._handleCancelConfigrmClick.bind(this);
        this._handleCloseConfirmDialog = this._closeConfirmDialog.bind(this);

        this._handleDeletePlaceClick = this._handleDeletePlaceClick.bind(this);
        this._handleOkDeletePlaceClick = this._handleOkDeletePlaceClick.bind(this);
        this._closeDeleteDialog = this._closeDeleteDialog.bind(this);

        this._handlePreviewPlaceClick = this._handlePreviewPlaceClick.bind(this);
        this._closePreviewDialog = this._closePreviewDialog.bind(this);
    }

    state = {
        currentLat: 0,
        currentLng: 0,
        currentZoom: 0,
        uploadImageDialogState: 0,
        isOpenedConfirmDialog: false,
        isOpenedDeleteDialog: false,
        isOpenedPreviewDialog: false,
        mapEditMode: 0,
    };

    componentDidMount() {
        if (!this.editingTour) {
            const sessionId = this.props.match.params.sessionId;
            this.tourStore.getFromSession(sessionId);
        }
    }

    get tourStore() {
        return this.props.rootStore.tourStore;
    }

    get editingPlace() {
        return this.tourStore.editingPlace;
    }

    get editingTour() {
        return this.tourStore.editingTour;
    }

    get editingConnection() {
        return this.tourStore.editingConnection;
    }

    get sessionId() {
        return this.tourStore.sessionId;
    }

    get showEditPlacePanel() {
        return Boolean(this.editingPlace);
    }

    get showEditConnectionPanel() {
        return Boolean(this.editingConnection);
    }

    get showEditTourPanel() {
        return Boolean(this.editingTour) && !this.showEditPlacePanel && !this.showEditConnectionPanel;
    }

    _handleStartPlaceChanged(e) {
        this.editingTour.startPlaceId = e.startPlaceId;
    }

    _handleViewImage360Click() {
        this.tourStore.viewPlaceImage360(this.editingPlace.id);
    }

    /* Confirm Save Dialog */
    _handleOkConfirmClick() {
        this.tourStore.completeEditing().then(() => {
            this.tourStore.cancelEditing();
        }).finally(() => {
            this._closeConfirmDialog();
        });
    }
    _handleCancelConfigrmClick() {
        this.tourStore.cancelEditing().finally(() => {
            this._closeConfirmDialog();
        });
    }
    _closeConfirmDialog() {
        this.setState({ isOpenedConfirmDialog: false });
    }

    /* Delete dialog */
    _handleDeletePlaceClick() {
        this.setState({ isOpenedDeleteDialog: true });
    }

    _handleOkDeletePlaceClick() {
        this.tourStore.removePlace(this.editingPlace.id).finally(() => {
            this._closeDeleteDialog();
            this.tourStore.cancelEditingPlace();
        });
    }
    _closeDeleteDialog() {
        this.setState({ isOpenedDeleteDialog: false });
    }

    /* Preview Dialog */
    _handlePreviewPlaceClick() {
        this.setState({ isOpenedPreviewDialog: true });
    }

    _closePreviewDialog() {
        this.setState({ isOpenedPreviewDialog: false });
    }

    _handleChangeImageMapClick(e) {
        this.setState({ uploadImageDialogState: TOUR_MAP });
    }

    _handleMouseMoveOnMap(e) {
        this.setState({ currentLat: e.latlng.lat, currentLng: e.latlng.lng });
    }

    _handleZoomChanged(e) {
        this.setState({ currentZoom: e.target._zoom });
    }

    _handleModeChanged(e) {
        this.setState({ mapEditMode: e.mode });
    }

    _handleClose() {
        if (this.tourStore.isDirty) {
            this.setState({ isOpenedConfirmDialog: true });
        } else {
            this.tourStore.cancelEditing();
        }
    }

    _handleSave() {
        this.tourStore.completeEditing();
    }

    _handleNameChanged(e) {
        this.editingTour.name = e.name;
    }

    _handlePlaceNameChanged(e) {
        this.editingPlace.name = e.name;
    }

    _handleChangePlaceImage360Click(e) {
        this.setState({ uploadImageDialogState: PLACE_360 });
    }

    _handleMapClick(e) {
        if (this.state.mapEditMode === DRAG_MAP) {
            if (this.editingPlace) {
                this.tourStore.saveEditingPlace(true);
            }
            if (this.editingConnection) {
                this.tourStore.saveEditingConnection(true);
            }
        } else if (this.state.mapEditMode === ADD_PLACE) {
            this.tourStore.addPlace({
                latitude: e.latlng.lat,
                longitude: e.latlng.lng,
            });
        }
    }

    _handlePlaceClick(e) {
        if (this.state.mapEditMode === DRAG_MAP) {
            this.tourStore.editPlace(e.place.id);
        } else if (this.state.mapEditMode === REMOVE_PLACE) {
            this.tourStore.removePlace(e.place.id);
        } else if (this.state.mapEditMode === ADD_CONNECTION) {
            this.tourStore.selectPlace(e.place);
        }

        // prevent map click event
        L.DomEvent.stopPropagation(e.lEvent);
    }

    _handleConnectionClick(e) {
        if (this.state.mapEditMode === DRAG_MAP) {
            this.tourStore.editConnection(e.connection.id);
        }
    }

    _renderMap() {
        if (this.editingTour.hasMapImage && this.editingTour.mapType === 'Image') {
            return this._renderImageMap()
        } else if (this.editingTour.mapType === 'Earth') {
            return this._renderEarthMap()
        } else {
            return this._renderNoMapPlaceholder();
        }
    }

    _renderNoMapPlaceholder() {
        const { classes } = this.props;

        return (<div className={classes.noImageMap}>
            <Typography className={classes.noImageMapPlaceholder}>Image for map is not selected. Click <PlaceholderButton onClick={this._handleChangeImageMapClick} text={'here'} /> to select image</Typography>
        </div>);
    }

    _renderImageMap() {
        const { classes } = this.props;
        const bounds = [[0, 0], [this.editingTour.imageHeight, this.editingTour.imageWidth]];
        const mapStyle = this.state.mapEditMode !== 0 ? { cursor: 'pointer' } : {};

        const places = this.editingTour.places || [];
        const connections = this.editingTour.connections || [];
        const firstPlace = this.tourStore.firstConnectionPlace;

        return (<div className={classes.mapWrapper}>
            <Map crs={L.CRS.Simple}
                bounds={bounds}
                className={classes.map}
                style={mapStyle}
                onclick={this._handleMapClick}
                onmousemove={this._handleMouseMoveOnMap}
                onzoomend={this._handleZoomChanged}>
                <ImageOverlay url={this.editingTour.mapImageUrl} bounds={bounds} />
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
                    const isSelected = ((this.editingPlace && place.id === this.editingPlace.id) || (firstPlace && firstPlace.id === place.id)) || false;
                    const isStart = this.editingTour.startPlaceId === place.id;

                    return <Place key={place.id}
                        place={place}
                        isSelected={isSelected}
                        isStart={isStart}
                        onClick={this._handlePlaceClick} />;
                })}
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

    _renderEarthMap() {
        const { classes } = this.props;
        const state = {
            position: [0, 0],
            zoom: 13,
        };

        return (
            <Map center={state.position}
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

    _handleFileSelected(e) {
        const { uploadImageDialogState } = this.state;
        if (uploadImageDialogState === TOUR_MAP) {
            return this.tourStore.updateImageMap(e.file, e.width, e.height).then(() => {
                this.setState({ uploadImageDialogState: CLOSED });
            });
        } else if (uploadImageDialogState === PLACE_360) {
            return this.tourStore.updateImage360(e.file, e.width, e.height).then(() => {
                this.setState({ uploadImageDialogState: CLOSED });
            });
        }
    }

    render() {
        const isOpened = this.editingTour != null;
        if (!isOpened) {
            return null;
        }

        const { classes } = this.props;
        const { uploadImageDialogState, isOpenedConfirmDialog, isOpenedDeleteDialog, isOpenedPreviewDialog, mapEditMode } = this.state;

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
                    {this.showEditTourPanel && <div className={classes.rightPanel}>
                        <EditTourPanel
                            tour={this.editingTour}
                            onNameChanged={this._handleNameChanged}
                            onChangeImageMapClick={this._handleChangeImageMapClick}
                            onStartPlaceChanged={this._handleStartPlaceChanged}
                        />
                        <MapEditMode
                            value={mapEditMode}
                            onModeChanged={this._handleModeChanged} />
                    </div>}
                    {this.showEditPlacePanel && <div className={classes.rightPanel}>
                        <EditPlacePanel
                            place={this.editingPlace}
                            onNameChanged={this._handlePlaceNameChanged}
                            onChangeImage360Click={this._handleChangePlaceImage360Click}
                            onViewImage360Click={this._handleViewImage360Click}
                            onPreviewClick={this._handlePreviewPlaceClick}
                            onDeleteClick={this._handleDeletePlaceClick}
                            onConnectionClick={(e) => {
                                this.tourStore.editPlace(e.connection.placeId);
                            }}
                            onViewConnectionClick={(e) => {
                                this.tourStore.viewPlaceImage360(e.connection.placeId);
                            }}
                            onRemoveConnectionClick={(e) => {
                                this.tourStore.deleteConnection(this.editingPlace.id, e.connection.placeId)
                            }}
                            onEditConnectionClick={(e) => {
                                this.tourStore.saveEditingPlace(true).then(() => {
                                    this.tourStore.editConnection(e.connection.id);
                                });
                            }}
                            onChangeSouncClick={(e) => {
                                
                            }}
                        />
                    </div>}
                    {this.showEditConnectionPanel && <div className={classes.rightPanel}>
                        <EditConnectionPanel
                            connection={this.editingConnection}
                            onStartPlacePositionChanged={(e) => {
                                this.editingConnection.startPlacePosition = e.value;
                            }}
                            onEndPlacePositionChanged={(e) => {
                                this.editingConnection.endPlacePosition = e.value;
                            }}
                        ></EditConnectionPanel>
                    </div>}
                </div>
                <UploadImageDialog
                    title="Upload new map"
                    prompt="Upload map of your virtual tour. E.g.: floor plan, street plan..."
                    isOpened={uploadImageDialogState !== CLOSED}
                    onFileSelected={this._handleFileSelected}
                    onClose={() => this.setState({ uploadImageDialogState: CLOSED })}
                />
                <ConfirmDialog
                    title='Save Virtual Tour'
                    okButtonText='Save'
                    cancelButtonText="Don't save"
                    contentText="You are about to close the designer. Do you want to save your changes?"
                    onOkClick={this._handleOkConfirmClick}
                    onCancelClick={this._handleCancelConfigrmClick}
                    isOpened={isOpenedConfirmDialog}
                    onClose={this._closeConfirmDialog}
                />
                <ConfirmDialog
                    title='Delete Place'
                    okButtonText='Yes'
                    cancelButtonText="No"
                    contentText="Are you sure you want to delete this place?"
                    onOkClick={this._handleOkDeletePlaceClick}
                    onCancelClick={this._closeDeleteDialog}
                    isOpened={isOpenedDeleteDialog}
                    onClose={this._closeDeleteDialog}
                />
                <ViewUrlDialog
                    title='Preview Place'
                    url={this.editingPlace && this.tourStore.getPlaceImage360Url(this.editingPlace.id)}
                    isOpened={isOpenedPreviewDialog}
                    onClose={this._closePreviewDialog}
                />
            </Dialog>
        );
    }
}));

TourDesigner.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TourDesigner);
