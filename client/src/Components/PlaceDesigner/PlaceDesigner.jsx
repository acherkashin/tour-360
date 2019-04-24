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
import { Texture } from './';

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

            this.state = {
                isOpenedConfirmDialog: false,
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

        _handleSave() {
        }

        render() {
            const isOpened = this.editingPlace != null;
            if (!isOpened) {
                return null;
            }

            const { classes } = this.props;

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
                    <Texture imageUrl={this.editingPlace.mapImage360Url} />
                </div>
            </Dialog>
        }
    }));

PlaceDesigner.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaceDesigner);