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
    Fab,
} from '@material-ui/core';
import {
    Close as CloseIcon,
    Add as AddIcon,
} from '@material-ui/icons';
import { intlShape, injectIntl } from 'react-intl';
import { LoadingButton } from './../'
import { Texture, NoPlacePlaceholder } from './';
import {
    ConfirmDialog,
    UploadImageDialog,
    ViewUrlDialog,
    HtmlEditDialog,
} from './../Dialogs';
import EditPlacePanel from './../TourDesigner/EditPlacePanel';
import { grey } from '@material-ui/core/colors';
import { CoordinateSystem } from './';
import { TextWidget, EditTextWidgetPanel } from './Widgets';
import { HEIGHT, WIDTH } from './utils';

const styles = theme => ({
    root: {},
    addWidget: {
        position: 'fixed',
        bottom: theme.spacing.unit * 3,
        right: 400 + theme.spacing.unit * 3,
    },
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
    surfaceWrapper: {
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
            this._handleTextureLoaded = this._handleTextureLoaded.bind(this);
            this._hanldeTextureLoading = this._hanldeTextureLoading.bind(this);
            this._handleWidgetClick = this._handleWidgetClick.bind(this);
            this._handleSurfaceWrapperClick = this._handleSurfaceWrapperClick.bind(this);
            this._handleOkConfirmClick = this._handleOkConfirmClick.bind(this);

            this._handlePreviewPlaceClick = this._handlePreviewPlaceClick.bind(this);
            this._closePreviewDialog = this._closePreviewDialog.bind(this);

            this._handleOpenDescriptionDialog = this._handleOpenDescriptionDialog.bind(this);
            this._handleCloseDescriptionDialog = this._handleCloseDescriptionDialog.bind(this);

            this.surfaceWrapperRef = React.createRef();

            this.state = {
                isOpenedPreviewDialog: false,
                isOpenedConfirmDialog: false,
                isOpenedPlaceDescriptionDialog: false,
                uploadImageDialogOpened: false,
                textureIsLoaded: false,
            };
        }

        get placeEditStore() {
            return this.props.rootStore.placeEditStore;
        }

        get editingPlace() {
            return this.placeEditStore.editingPlace;
        }

        get editingWidget() {
            return this.placeEditStore.editingWidget;
        }

        get showEditWidget() {
            return Boolean(this.editingWidget);
        }

        get showEditPlacePanel() {
            return Boolean(this.editingPlace) && !this.showEditWidget;
        }

        componentDidMount() {
            if (!this.editingPlace) {
                const sessionId = this.props.match.params.sessionId;
                this.placeEditStore.getFromSession(sessionId);
            }
        }

        componentDidUpdate(prevProps, prevState) {
            if (!prevState.textureIsLoaded && this.state.textureIsLoaded) {
                const el = this.surfaceWrapperRef.current;
                this._scrollToCenter(el);
            }
        }

        _scrollToCenter(el) {
            const top = (el.scrollHeight - el.clientHeight) / 2;
            const left = (el.scrollWidth - el.clientWidth) / 2;
            el.scrollTop = top;
            el.scrollLeft = left;
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
            // rename to save changes and create method to complete editing where designer will be closed
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
            this.placeEditStore.viewPlaceImage360();
        }

        _handleWidgetItemClick(e) {
            this._navigateToWidget(e.widget.id);
            this.placeEditStore.editWidget(e.widget.id);
        }

        _navigateToWidget(id) {
            //TODO: reimplement it to show widget in the center of screen
            document.getElementById(id).scrollIntoView();
        }

        _renderWidgetEditPanel() {
            const widget = this.editingWidget;

            if (widget.type === 'text') {
                return <EditTextWidgetPanel
                    key={widget.id}
                    widget={widget}
                    onXChanged={e => this.editingWidget.x = e.x}
                    onYChanged={e => this.editingWidget.y = e.y}
                    onContentChanged={e => this.editingWidget.content = e.content}
                    onTextColorChanged={color => this.editingWidget.color = color}
                    onTextBackgroundColorChanged={color => this.editingWidget.backgroundColor = color}
                    onDeleteClick={e => this.placeEditStore.deleteWidget(e.widget.id)}
                />
            }

            throw new Error("Unknown type of widget");
        }

        _renderWidget(widget) {
            if (widget.type === 'text') {
                return <TextWidget
                    key={widget.id}
                    widget={widget}
                    isSelected={Boolean(this.editingWidget && this.editingWidget.id === widget.id)}
                    onClick={this._handleWidgetClick}
                />;
            }

            throw new Error("Unknown type of widget");
        }

        _handleWidgetClick(event) {
            this.placeEditStore.editWidget(event.widget.id);
        }

        _renderSurface() {
            const { classes } = this.props;
            const { textureIsLoaded } = this.state;

            return <>
                <Texture
                    onClick={() => this.placeEditStore.completeEditWidget()}
                    imageUrl={this.editingPlace.mapImage360Url}
                    onLoaded={this._handleTextureLoaded}
                    onLoading={this._hanldeTextureLoading} />
                {textureIsLoaded && <div className={classes.widgetArea}>
                    <CoordinateSystem
                        width={WIDTH}
                        height={HEIGHT}
                        stepX={200}
                        stepY={100}
                    />
                    {this.editingPlace.widgets && this.editingPlace.widgets.map((item) => this._renderWidget(item))}
                </div>}
            </>;
        }

        _handleTextureLoaded() {
            this.setState({ textureIsLoaded: true });
        }

        _hanldeTextureLoading() {
            this.setState({ textureIsLoaded: false });
        }

        _handlePreviewPlaceClick() {
            this.setState({ isOpenedPreviewDialog: true });
        }

        _closePreviewDialog() {
            this.setState({ isOpenedPreviewDialog: false });
        }

        _handleOpenDescriptionDialog() {
            this.setState({ isOpenedPlaceDescriptionDialog: true });
        }

        _handleCloseDescriptionDialog() {
            this.setState({ isOpenedPlaceDescriptionDialog: false });
        }

        _handleSurfaceWrapperClick(e) {
            this.placeEditStore.completeEditWidget();
        }

        _addWidget(e) {
            this.placeEditStore.addWidget('text');
        }

        render() {
            const { messages, formatMessage } = this.props.intl;
            const isOpened = this.editingPlace != null;
            if (!isOpened) {
                return null;
            }

            const { isDirty, saveLoading } = this.placeEditStore;
            const { classes } = this.props;
            const {
                uploadImageDialogOpened,
                isOpenedPreviewDialog,
                isOpenedConfirmDialog,
                isOpenedPlaceDescriptionDialog,
            } = this.state;

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
                        <LoadingButton color={"inherit"} disabled={!isDirty} isLoading={saveLoading} onClick={this._handleSave}>{formatMessage(messages.save)}</LoadingButton>
                    </Toolbar>
                </AppBar>
                <div className={classes.content}>
                    <div className={classes.surfaceWrapper} ref={this.surfaceWrapperRef} onClick={this._handleSurfaceWrapperClick}>
                        {this.editingPlace.mapImage360Url && this._renderSurface()}
                        {!this.editingPlace.mapImage360Url && <NoPlacePlaceholder onUploadClick={this._handleUploadImage} />}
                    </div>
                    {this.editingPlace.mapImage360Url && <Fab color="secondary" className={classes.addWidget} onClick={() => this._addWidget()}>
                        <AddIcon />
                    </Fab>}
                    {this.showEditWidget && <div className={classes.rightPanel}>
                        {this._renderWidgetEditPanel()}
                    </div>}
                    {this.showEditPlacePanel && <div className={classes.rightPanel}>
                        <EditPlacePanel
                            showWidgets={true}
                            showConnections={false}
                            place={this.editingPlace}
                            onNameChanged={this._handlePlaceNameChanged}
                            onChangeImage360Click={this._handleUploadImage}
                            onViewImage360Click={this._handleViewImage360Click}
                            onPreviewClick={this._handlePreviewPlaceClick}
                            onSoundChanged={(e) => {
                                this.placeEditStore.updatePlaceSound(e.file);
                            }}
                            onSoundRemoved={(e) => {
                                this.placeEditStore.removePlaceSound();
                            }}
                            onDescriptionClick={this._handleOpenDescriptionDialog}
                            onWidgetClick={this._handleWidgetItemClick}
                            onRemoveWidgetClick={e => this.placeEditStore.deleteWidget(e.widget.id)}
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
                <ViewUrlDialog
                    title={formatMessage(messages.tourDesignerPreviewPlace)}
                    url={this.placeEditStore.getPlaceImage360Url(this.editingPlace.id)}
                    isOpened={isOpenedPreviewDialog}
                    onClose={this._closePreviewDialog}
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
                <HtmlEditDialog
                    title={formatMessage(messages.tourDesignerEditPlaceDescription)}
                    htmlContent={this.editingPlace.description}
                    isOpened={isOpenedPlaceDescriptionDialog}
                    onClose={this._handleCloseDescriptionDialog}
                    onSaveClick={(e) => {
                        this.editingPlace.description = e.htmlContent;
                        this._handleCloseDescriptionDialog();
                    }}
                />
            </Dialog>
        }
    }));

PlaceDesigner.propTypes = {
    classes: PropTypes.object.isRequired,

    intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(PlaceDesigner));