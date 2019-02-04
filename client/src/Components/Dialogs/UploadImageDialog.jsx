import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, DialogActions, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DialogTitleWithClose from './DialogTItleWithClose';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
    prompt: {
        paddingTop: theme.spacing.unit * 3,
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class UploadImageDialog extends React.Component {
    constructor(props) {
        super(props);

        this._handleUploadClick = this._handleUploadClick.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleFileSelected = this._handleFileSelected.bind(this);
    }

    _handleFileSelected(e) {
        const file = e.target.files[0];
        this.props.onFileSelected && this.props.onFileSelected({ origin: this, file });
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
                    <Button variant="contained" component="label" color="primary" className={classes.button} onClick={this._handleUploadClick}>
                        Select File
                        <input type="file" style={{ display: "none" }} onChange={this._handleFileSelected} />
                        {/* <CloudUploadIcon className={classes.rightIcon} /> */}
                    </Button>
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
    onFileSelected: PropTypes.func,
};

export default withStyles(styles)(UploadImageDialog);