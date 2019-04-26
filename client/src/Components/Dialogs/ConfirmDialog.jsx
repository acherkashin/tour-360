import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@material-ui/core';
import DialogTitleWithClose from './DialogTItleWithClose';
import { injectIntl } from 'react-intl';

class ConfirmDialog extends React.Component {
    constructor(props) {
        super(props);

        this._handleClose = this._handleClose.bind(this);
        this._handleOkClick = this._handleOkClick.bind(this);
        this._handleCancelClick = this._handleCancelClick.bind(this);
    }

    _handleOkClick() {
        this.props.onOkClick();
    }

    _handleCancelClick() {
        this.props.onCancelClick();
    }

    _handleClose() {
        this.props.onClose({ origin: this });
    }

    render() {
        const { cancelButtonText, okButtonText, isOpened, title, contentText } = this.props;

        return (
            <Dialog
                onClose={this._handleClose}
                open={isOpened}
                maxWidth={'sm'}
                fullWidth>
                <DialogTitleWithClose onClose={this._handleClose}>{title}</DialogTitleWithClose>
                <DialogContent>
                    <DialogContentText>{contentText}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this._handleCancelClick} color="primary">{cancelButtonText || "Cancel"}</Button>
                    <Button onClick={this._handleOkClick} color="primary" variant="contained" autoFocus>{okButtonText || "Ok"}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmDialog.propTypes = {
    title: PropTypes.string.isRequired,
    contentText: PropTypes.string.isRequired,
    okButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    onOkClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    isOpened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default injectIntl(ConfirmDialog);