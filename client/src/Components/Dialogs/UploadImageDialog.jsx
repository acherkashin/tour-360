import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, DialogActions, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DialogTitleWithClose from './DialogTItleWithClose';

const styles = theme => ({
    prompt: {
        paddingTop: theme.spacing.unit * 3,
    }
});

class UploadImageDialog extends React.Component {
    constructor(props) {
        super(props);

        this._handleUploadClick = this._handleUploadClick.bind(this);
        this._handleClose = this._handleClose.bind(this);
    }

    _handleUploadClick() {
        this.props.onUploadClick && this.props.onUploadClick({ origin: this, name: this.props.name });
    }

    _handleClose() {
        this.props.onClose && this.props.onClose({ origin: this });
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog
                onClose={this._handleClose}
                open={this.props.isOpened}
                maxWidth={'sm'}
                fullWidth>
                <DialogTitleWithClose onClose={this._handleClose}>Upload a new photo</DialogTitleWithClose>
                <DialogContent>
                    <Typography align="center" variant="body1" className={classes.prompt}>Upload cover of your virtual tour</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this._handleUploadClick} color="primary">Upload</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

UploadImageDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    isOpened: PropTypes.bool,
    onUploadClick: PropTypes.func,
    onClose: PropTypes.func,
};

export default withStyles(styles)(UploadImageDialog);