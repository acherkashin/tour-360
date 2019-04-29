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
import { Texture, NoPlacePlaceholder } from './';
import { UploadImageDialog } from './../Dialogs';

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
        overflow: 'auto',
        // display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'stretch',
    },
});

const PlaceDesigner = inject("rootStore")(observer(
    class PlaceDesigner extends React.Component {
        constructor(props) {
            super(props);

            this._handleClose = this._handleClose.bind(this);
            this._handleSave = this._handleSave.bind(this);
            this._handleUploadImage = this._handleUploadImage.bind(this);
            this._handleFileSelected= this._handleFileSelected.bind(this);

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
            // this.placeEditStore.
        }

        render() {
            const isOpened = this.editingPlace != null;
            if (!isOpened) {
                return null;
            }

            const { classes } = this.props;
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
                        {/* <LoadingButton color={"inherit"} disabled={!isDirty} isLoading={saveLoading} onClick={this._handleSave}>save</LoadingButton> */}
                    </Toolbar>
                </AppBar>
                <div className={classes.content}>
                    {this.editingPlace.mapImage360Url && <Texture imageUrl={this.editingPlace.mapImage360Url} />}
                    {!this.editingPlace.mapImage360Url && <NoPlacePlaceholder onUploadClick={this._handleUploadImage} />}
                </div>
                <UploadImageDialog
                    title="Upload new map"
                    prompt="Upload map of your virtual tour. E.g.: floor plan, street plan..."
                    isOpened={uploadImageDialogOpened}
                    onFileSelected={this._handleFileSelected}
                    onClose={() => this.setState({ uploadImageDialogOpened: false })}
                />
            </Dialog>
        }
    }));

PlaceDesigner.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaceDesigner);