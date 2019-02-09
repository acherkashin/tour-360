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
    selectImage: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    previewContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    imagePreview: {
        maxHeight: '400px',
        maxWidth: '400px',
    }
});

class UploadImageDialog extends React.Component {
    constructor(props) {
        super(props);

        this._handleUploadClick = this._handleUploadClick.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleFileSelected = this._handleFileSelected.bind(this);
        this._handleFileUpload = this._handleFileUpload.bind(this);
    }

    state = {
        selectedFile: null,
        selectedFileUrl: null,
    };

    _handleFileSelected(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            this.setState({ selectedFileUrl: e.target.result, selectedFile: file })
        };

        reader.readAsDataURL(file);
    }

    _handleFileUpload(e) {
        this.props.onFileSelected && this.props.onFileSelected({ origin: this, file: this.state.selectedFile });
    }

    _handleUploadClick() {
        this.props.onUploadClick && this.props.onUploadClick({ origin: this, name: this.props.name });
    }

    _handleClose() {
        this.setState({ selectedFile: null, selectedFileUrl: null });
        this.props.onClose && this.props.onClose({ origin: this });
    }

    render() {
        const { classes } = this.props;
        const { selectedFileUrl } = this.state;

        return (
            <Dialog
                onClose={this._handleClose}
                open={this.props.isOpened}
                maxWidth={'sm'}
                fullWidth>
                <DialogTitleWithClose onClose={this._handleClose}>Upload a new photo</DialogTitleWithClose>
                <DialogContent className={classes.previewContainer}>
                    {!selectedFileUrl && <Typography align="center" variant="body1" className={classes.prompt}>Upload cover of your virtual tour</Typography>}
                    {selectedFileUrl && <img className={classes.imagePreview} src={selectedFileUrl} />}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" component="label" color="primary" className={classes.selectImage} onClick={this._handleUploadClick}>
                        Select File
                        <input type="file" style={{ display: "none" }} onChange={this._handleFileSelected} />
                    </Button>
                    {selectedFileUrl != null && <Button variant="contained" color="primary" onClick={this._handleFileUpload} >
                        Upload
                        <CloudUploadIcon className={classes.rightIcon} />
                    </Button>}
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