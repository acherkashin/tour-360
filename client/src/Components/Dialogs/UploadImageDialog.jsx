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
    imagePreview: {
        maxHeight: '600px',
        maxWidth: '600px',
        alignSelf: 'center',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    previewContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    width: {
        marginRight: theme.spacing.unit / 2,
    },
    dialogActions: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
    dialogContent: {
        paddingBottom: theme.spacing.unit * 2,
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
        fileWidth: null,
        fileHeight: null,
    };

    componentDidMount() {
        if (this.selectedFileUrl) {
            window.URL.revokeObjectURL(this.state.selectedFileUrl);
        }
    }

    _handleFileSelected(e) {
        const file = e.target.files[0];

        if (file) {
            if (this.state.selectedFileUrl) {
                window.URL.revokeObjectURL(this.state.selectedFileUrl);
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const selectedFileUrl = e.target.result;
                const img = new Image();
                img.src = selectedFileUrl;

                img.onload = () => {
                    window.URL.revokeObjectURL(img.src);

                    this.setState({
                        selectedFileUrl,
                        selectedFile: file,
                        fileWidth: img.naturalWidth,
                        fileHeight: img.naturalHeight,
                    })
                };

            };

            reader.readAsDataURL(file);
        }
    }

    _handleFileUpload(e) {
        const { selectedFile: file, fileWidth: width, fileHeight: height } = this.state;
        this.props.onFileSelected && this.props.onFileSelected({ origin: this, file, width, height });
    }

    _handleUploadClick() {
        this.props.onUploadClick && this.props.onUploadClick({ origin: this, name: this.props.name });
    }

    _handleClose() {
        this.props.onClose({ origin: this });
    }

    _resetSelection() {
        this.setState({ selectedFile: null, selectedFileUrl: null });
    }

    render() {
        const { classes, title, prompt } = this.props;
        const { selectedFileUrl, fileWidth, fileHeight } = this.state;
        const selectButtonVariant = selectedFileUrl != null ? "text" : "contained";

        return (
            <Dialog
                onExited={() => this._resetSelection()}
                onClose={this._handleClose}
                open={this.props.isOpened}
                maxWidth={'sm'}
                fullWidth>
                <DialogTitleWithClose onClose={this._handleClose}>{title}</DialogTitleWithClose>
                <DialogContent className={classes.dialogContent}>
                    {!selectedFileUrl && <Typography align="center" variant="body1" className={classes.prompt}>{prompt}</Typography>}
                    {selectedFileUrl && (<div className={classes.previewContainer}>
                        <img className={classes.imagePreview} src={selectedFileUrl} alt="Selected preview" />
                        <div>
                            <Typography inline className={classes.width}>
                                Width: {fileWidth},
                            </Typography>
                            <Typography inline>
                                Height: {fileHeight}
                            </Typography>
                        </div>
                    </div>)}
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button variant={selectButtonVariant} component="label" color="primary" className={classes.selectImage} onClick={this._handleUploadClick} autoFocus>
                        Select File
                        <input type="file" style={{ display: "none" }} onChange={this._handleFileSelected} />
                    </Button>
                    {selectedFileUrl != null && <Button variant="contained" color="primary" onClick={this._handleFileUpload} autoFocus>
                        Upload
                        <CloudUploadIcon className={classes.rightIcon} />
                    </Button>}
                </DialogActions>
            </Dialog>
        );
    }
}

UploadImageDialog.propTypes = {
    title: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    isOpened: PropTypes.bool,
    onUploadClick: PropTypes.func,
    onClose: PropTypes.func,
    onFileSelected: PropTypes.func.isRequired,
};

export default withStyles(styles)(UploadImageDialog);