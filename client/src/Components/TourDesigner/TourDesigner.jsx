import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import {
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
} from '@material-ui/core';
import { intlShape, injectIntl } from 'react-intl';
import CloseIcon from '@material-ui/icons/Close';
import EditTourPanel from './EditTourPanel';
import EditConnectionPanel from './EditConnectionPanel';
import MapEditMode from './MapEditMode';
import { PlaceholderButton, LoadingButton } from './../';
import {
    UploadImageDialog,
    ConfirmDialog,
    HtmlEditDialog,
    ViewUrlDialog,
} from './../Dialogs';
import { TourMap } from './';
import { DRAG_MAP, ADD_PLACE, REMOVE_PLACE, ADD_CONNECTION } from './Modes';
import EditPlacePanel from './EditPlacePanel';
import { grey } from '@material-ui/core/colors';

const styles = (theme) => ({
    appBar: {
        position: 'relative',
    },
    tourName: {
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
    rightPanel: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 500,
        minWidth: 400,
        flexBasis: 400,
        backgroundColor: grey[100],
        borderLeft: `1px solid ${theme.palette.divider}`,
    },
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
        this._handleZoomChanged = this._handleZoomChanged.bind(this);
        this._handleChangeImageMapClick = this._handleChangeImageMapClick.bind(this);
        this._handleFileSelected = this._handleFileSelected.bind(this);
        this._handleModeChanged = this._handleModeChanged.bind(this);
        this._handlePlaceClick = this._handlePlaceClick.bind(this);
        this._handleViewImage360Click = this._handleViewImage360Click.bind(this);
        this._handleConnectionClick = this._handleConnectionClick.bind(this);
        this._handleStartPlaceChanged = this._handleStartPlaceChanged.bind(this);
        this._handleIsPublicChanged = this._handleIsPublicChanged.bind(this);

        this._handleOkConfirmClick = this._handleOkConfirmClick.bind(this);
        this._handleCancelConfigrmClick = this._handleCancelConfigrmClick.bind(this);
        this._handleCloseConfirmDialog = this._handleCloseConfirmDialog.bind(this);

        this._handleDeletePlaceClick = this._handleDeletePlaceClick.bind(this);
        this._handleOkDeletePlaceClick = this._handleOkDeletePlaceClick.bind(this);
        this._closeDeleteDialog = this._closeDeleteDialog.bind(this);

        this._handlePreviewPlaceClick = this._handlePreviewPlaceClick.bind(this);
        this._closePreviewDialog = this._closePreviewDialog.bind(this);

        this._handleOpenDescriptionDialog = this._handleOpenDescriptionDialog.bind(this);
        this._handleCloseDescriptionDialog = this._handleCloseDescriptionDialog.bind(this);
    }

    state = {
        uploadImageDialogState: CLOSED,
        isOpenedConfirmDialog: false,
        isOpenedDeleteDialog: false,
        isOpenedPreviewDialog: false,
        isOpenedPlaceDescriptionDialog: false,
        mapEditMode: 0,
    };

    componentDidMount() {
        if (!this.editingTour) {
            const sessionId = this.props.match.params.sessionId;
            this.tourStore.getFromSession(sessionId);
        }
    }

    get tourStore() {
        return this.props.rootStore.tourEditStore;
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

    _handleIsPublicChanged(e) {
        this.editingTour.isPublic = e.isPublic;
    }

    _handleViewImage360Click() {
        this.tourStore.viewPlaceImage360(this.editingPlace.id);
    }

    /* Confirm Save Dialog */
    _handleOkConfirmClick() {
        this.tourStore.completeEditing().then(() => {
            this.tourStore.cancelEditing();
        }).finally(() => {
            this._handleCloseConfirmDialog();
        });
    }

    _handleCancelConfigrmClick() {
        this.tourStore.cancelEditing().finally(() => {
            this._handleCloseConfirmDialog();
        });
    }

    _handleCloseConfirmDialog() {
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

    /* Description Dialog */
    _handleOpenDescriptionDialog() {
        this.setState({ isOpenedPlaceDescriptionDialog: true });
    }

    _handleCloseDescriptionDialog() {
        this.setState({ isOpenedPlaceDescriptionDialog: false });
    }

    _handleChangeImageMapClick(e) {
        this.setState({ uploadImageDialogState: TOUR_MAP });
    }

    _handleZoomChanged(e) {
        this.setState({ currentZoom: e.zoom });
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
    }

    _handleConnectionClick(e) {
        if (this.state.mapEditMode === DRAG_MAP) {
            this.tourStore.editConnection(e.connection.id);
        }
    }

    _renderMap() {
        if ((this.editingTour.hasMapImage && this.editingTour.mapType === 2) || this.editingTour.mapType === 1) {
            const mapStyle = this.state.mapEditMode !== 0 ? { cursor: 'pointer' } : {};
            const selectedPlaceId = this._getSelectedPlaceId();

            return <TourMap
                tour={this.editingTour}
                mapStyle={mapStyle}
                selectedPlaceId={selectedPlaceId}
                onClick={this._handleMapClick}
                onConnectionClick={this._handleConnectionClick}
                onPlaceClick={this._handlePlaceClick}
                onZoomChanged={this._handleZoomChanged}
            />;
        } else {
            return this._renderNoMapPlaceholder();
        }
    }

    _renderNoMapPlaceholder() {
        const { classes } = this.props;
        const { messages, formatMessage } = this.props.intl;

        return (<div className={classes.noImageMap}>
            <Typography className={classes.noImageMapPlaceholder}>{formatMessage(messages.tourDesignerNoImageMapPlaceholderFirstPart)} <PlaceholderButton onClick={this._handleChangeImageMapClick} text={formatMessage(messages.here)} /> {formatMessage(messages.tourDesignerNoImageMapPlaceholderSecondPart)}</Typography>
        </div>);
    }

    _getSelectedPlaceId() {
        if (this.editingPlace) {
            return this.editingPlace.id;
        }

        const firstPlace = this.tourStore.firstConnectionPlace;

        if (firstPlace) {
            return firstPlace.id;
        }

        return null;
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
        const {
            uploadImageDialogState,
            isOpenedConfirmDialog,
            isOpenedDeleteDialog,
            isOpenedPreviewDialog,
            isOpenedPlaceDescriptionDialog,
            mapEditMode,
        } = this.state;
        const { saveLoading, isDirty } = this.tourStore;
        const { messages, formatMessage } = this.props.intl;

        return (
            <Dialog
                open={true}
                fullScreen
                onClose={this._handleClose}
                TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this._handleClose} aria-label={formatMessage(messages.close)}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.tourName}>{this.editingTour.name}</Typography>
                        <LoadingButton color={"inherit"} disabled={!isDirty} isLoading={saveLoading} onClick={this._handleSave}>{formatMessage(messages.save)}</LoadingButton>
                    </Toolbar>
                </AppBar>
                <div className={classes.content}>
                    {this._renderMap()}
                    {!this.editingTour.mapType && <Typography className={classes.map}>{formatMessage(messages.tourDesignerMapTypeError)}</Typography>}
                    {this.showEditTourPanel && <div className={classes.rightPanel}>
                        <EditTourPanel
                            tour={this.editingTour}
                            onNameChanged={this._handleNameChanged}
                            onChangeImageMapClick={this._handleChangeImageMapClick}
                            onStartPlaceChanged={this._handleStartPlaceChanged}
                            onIsPublicChanged={this._handleIsPublicChanged}
                        />
                        <MapEditMode
                            value={mapEditMode}
                            onModeChanged={this._handleModeChanged} />
                    </div>}
                    {this.showEditPlacePanel && <div className={classes.rightPanel}>
                        <EditPlacePanel
                            showConnections={true}
                            showWidgets={false}
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
                            onSoundChanged={(e) => {
                                this.tourStore.updatePlaceSound(e.file);
                            }}
                            onSoundRemoved={(e) => {
                                this.tourStore.removePlaceSound();
                            }}
                            onDescriptionClick={this._handleOpenDescriptionDialog}
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
                    title={formatMessage(messages.tourDesignerUploadNewMap)}
                    prompt={formatMessage(messages.tourDesignerUploadNewMapPrompt)}
                    isOpened={uploadImageDialogState !== CLOSED}
                    onFileSelected={this._handleFileSelected}
                    onClose={() => this.setState({ uploadImageDialogState: CLOSED })}
                />
                <ConfirmDialog
                    title={formatMessage(messages.tourDesignerSaveTour)}
                    okButtonText={formatMessage(messages.save)}
                    cancelButtonText={formatMessage(messages.doNotSave)}
                    contentText={formatMessage(messages.tourDesignerSaveTourContentText)}
                    onOkClick={this._handleOkConfirmClick}
                    onCancelClick={this._handleCancelConfigrmClick}
                    isOpened={isOpenedConfirmDialog}
                    onClose={this._handleCloseConfirmDialog}
                />
                <ConfirmDialog
                    title={formatMessage(messages.tourDesignerDeletePlace)}
                    okButtonText={formatMessage(messages.yes)}
                    cancelButtonText={formatMessage(messages.no)}
                    contentText={formatMessage(messages.tourDesignerDeletePlaceContentText)}
                    onOkClick={this._handleOkDeletePlaceClick}
                    onCancelClick={this._closeDeleteDialog}
                    isOpened={isOpenedDeleteDialog}
                    onClose={this._closeDeleteDialog}
                />
                <ViewUrlDialog
                    title={formatMessage(messages.tourDesignerPreviewPlace)}
                    url={this.editingPlace && this.tourStore.getPlaceImage360Url(this.editingPlace.id)}
                    isOpened={isOpenedPreviewDialog}
                    onClose={this._closePreviewDialog}
                />
                <HtmlEditDialog
                    title={formatMessage(messages.tourDesignerEditPlaceDescription)}
                    htmlContent={this.editingPlace && this.editingPlace.description}
                    isOpened={isOpenedPlaceDescriptionDialog}
                    onClose={this._handleCloseDescriptionDialog}
                    onSaveClick={(e) => {
                        this.editingPlace.description = e.htmlContent;
                        this._handleCloseDescriptionDialog();
                    }}
                />
            </Dialog>
        );
    }
}));

TourDesigner.propTypes = {
    classes: PropTypes.object.isRequired,

    intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(TourDesigner));
