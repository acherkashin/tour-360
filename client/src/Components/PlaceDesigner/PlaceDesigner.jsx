import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Dialog,
    Toolbar,
    IconButton,
    Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { intlShape, injectIntl } from 'react-intl';
import { LoadingButton } from './../'
import { Texture, NoPlacePlaceholder } from './';
import { ConfirmDialog, UploadImageDialog } from './../Dialogs';
import EditPlacePanel from './../TourDesigner/EditPlacePanel';
import { grey } from '@material-ui/core/colors';
import { TextWidget, CoordinateSystem } from './';
import { HEIGHT, WIDTH } from './utils';

const styles = theme => ({
    root: {},
    appBar: {
        position: 'relative',
    },
    tourName: {
        flex: 1,
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    panoWrapper: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        position: 'relative',
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
    widgetArea: {
        position: 'absolute',
        top: 285,
    }
});

const PlaceDesigner = inject("rootStore")(observer(
    class PlaceDesigner extends React.Component {
        constructor(props) {
            super(props);

            this._handleClose = this._handleClose.bind(this);
            this._handleSave = this._handleSave.bind(this);
            this._handlePlaceNameChanged = this._handlePlaceNameChanged.bind(this);
            this._handleUploadImage = this._handleUploadImage.bind(this);
            this._handleFileSelected = this._handleFileSelected.bind(this);
            this._handleCloseConfirmDialog = this._handleCloseConfirmDialog.bind(this);
            this._handleCancelConfigrmClick = this._handleCancelConfigrmClick.bind(this);
            this._handleViewImage360Click = this._handleViewImage360Click.bind(this);

            this.state = {
                isOpenedConfirmDialog: false,
                uploadImageDialogOpened: false,
            };
        }

        get placeEditStore() {
            return this.props.rootStore.placeEditStore;
        }

        get editingPlace() {
            return this.placeEditStore.editingPlace;
        }

        get showEditPlacePanel() {
            return Boolean(this.editingPlace);
        }

        componentDidMount() {
            if (!this.editingPlace) {
                const sessionId = this.props.match.params.sessionId;
                this.placeEditStore.getFromSession(sessionId);
            }
        }

        _handleClose() {
            if (this.placeEditStore.isDirty) {
                this.setState({ isOpenedConfirmDialog: true });
            } else {
                this.placeEditStore.cancelEditing();
            }
        }

        _handleUploadImage() {
            this.setState({ uploadImageDialogOpened: true });
        }

        _handleFileSelected(e) {
            this.placeEditStore.updateImage360(e.file, e.width, e.height).then(() => {
                this.setState({ uploadImageDialogOpened: false });
            });
        }

        _handleSave() {
            this.placeEditStore.completeEditing();
        }

        _handleCloseConfirmDialog() {
            this.setState({ isOpenedConfirmDialog: false });
        }

        _handleOkConfirmClick() {
            this.placeEditStore.completeEditing().then(() => {
                this.placeEditStore.cancelEditing();
            }).finally(() => {
                this._handleCloseConfirmDialog();
            });
        }

        _handleCancelConfigrmClick() {
            this.placeEditStore.cancelEditing().finally(() => {
                this._handleCloseConfirmDialog();
            });
        }

        _handlePlaceNameChanged(e) {
            this.editingPlace.name = e.name;
        }

        _handleViewImage360Click() {
            this.placeEditStore.viewPlaceImage360(this.editingPlace.id);
        }

        _renderWidget(widget) {
            if (widget.type === 'text') {
                return <TextWidget key={widget.id} options={widget} />;
            }

            throw new Error("Unknown type of widget");
        }

        render() {
            const { messages, formatMessage } = this.props.intl;
            const isOpened = this.editingPlace != null;
            if (!isOpened) {
                return null;
            }

            const { isDirty, saveLoading } = this.placeEditStore;
            const { classes, isOpenedConfirmDialog } = this.props;
            const { uploadImageDialogOpened } = this.state;

            return <Dialog
                open={true}
                fullScreen
                onClose={this._handleClose}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this._handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.tourName}>{this.editingPlace.name}</Typography>
                        <LoadingButton color={"inherit"} disabled={!isDirty} isLoading={saveLoading} onClick={this._handleSave}>save</LoadingButton>
                    </Toolbar>
                </AppBar>
                <div className={classes.content}>
                    <div className={classes.panoWrapper}>
                        {this.editingPlace.mapImage360Url &&
                            <>
                                <Texture imageUrl={this.editingPlace.mapImage360Url} />
                                <div className={classes.widgetArea}>
                                    <CoordinateSystem
                                        width={WIDTH}
                                        height={HEIGHT}
                                        stepX={200}
                                        stepY={100}
                                    />
                                    {this.editingPlace.widgets && this.editingPlace.widgets.map((item) => this._renderWidget(item))}
                                </div>
                            </>}
                        {!this.editingPlace.mapImage360Url && <NoPlacePlaceholder onUploadClick={this._handleUploadImage} />}
                    </div>
                    {this.showEditPlacePanel && <div className={classes.rightPanel}>
                        <EditPlacePanel
                            place={this.editingPlace}
                            onNameChanged={this._handlePlaceNameChanged}
                            onChangeImage360Click={this._handleUploadImage}
                            onViewImage360Click={this._handleViewImage360Click}
                            onPreviewClick={this._handlePreviewPlaceClick}
                            // onDeleteClick={this._handleDeletePlaceClick}
                            onConnectionClick={(e) => {
                                // this.tourStore.editPlace(e.connection.placeId);
                            }}
                            onViewConnectionClick={(e) => {
                                // this.tourStore.viewPlaceImage360(e.connection.placeId);
                            }}
                            onRemoveConnectionClick={(e) => {
                                // this.tourStore.deleteConnection(this.editingPlace.id, e.connection.placeId)
                            }}
                            onEditConnectionClick={(e) => {
                                // this.tourStore.saveEditingPlace(true).then(() => {
                                //     this.tourStore.editConnection(e.connection.id);
                                // });
                            }}
                            onSoundChanged={(e) => {
                                // this.tourStore.updatePlaceSound(e.file);
                            }}
                            onSoundRemoved={(e) => {
                                // this.tourStore.removePlaceSound();
                            }}
                            onDescriptionClick={this._handleOpenDescriptionDialog}
                        />
                    </div>}
                </div>
                <UploadImageDialog
                    title={formatMessage(messages.placeDesignerUploadPanoTitle)}
                    prompt={formatMessage(messages.placeDesignerUploadPanoPrompt)}
                    isOpened={uploadImageDialogOpened}
                    onFileSelected={this._handleFileSelected}
                    onClose={() => this.setState({ uploadImageDialogOpened: false })}
                />
                <ConfirmDialog
                    title={formatMessage(messages.placeDesignerSaveDialogTitle)}
                    okButtonText={formatMessage(messages.save)}
                    cancelButtonText={formatMessage(messages.doNotSave)}
                    contentText={formatMessage(messages.placeDesignerConfirmMessage)}
                    onOkClick={this._handleOkConfirmClick}
                    onCancelClick={this._handleCancelConfigrmClick}
                    isOpened={isOpenedConfirmDialog}
                    onClose={this._handleCloseConfirmDialog}
                />
            </Dialog>
        }
    }));

PlaceDesigner.propTypes = {
    classes: PropTypes.object.isRequired,

    intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(PlaceDesigner));