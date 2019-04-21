import React from 'react';
import PropTypes from 'prop-types';
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

class PlaceDesigner extends React.Component {
    constructor(props) {
        super(props);

        this._handleClose = this._handleClose.bind(this);
        this._handleSave = this._handleSave.bind(this);
    }

    componentDidMount() {
    }

    _handleClose() {
    }

    _handleSave() {
    }

    render() {
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
                    {/* <Typography variant="h6" color="inherit" className={classes.tourName}>{this.editingTour.name}</Typography> */}
                    {/* <LoadingButton color={"inherit"} disabled={!isDirty} isLoading={saveLoading} onClick={this._handleSave}>save</LoadingButton> */}
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
                <Texture
                    imageUrl={'/5cb35a0226f829361469ee6e-2302e610-644e-11e9-8a4e-01b6ab716280-place-360.JPG?1555854578976'}
                />
            </div>
        </Dialog>
    }
}

PlaceDesigner.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaceDesigner);