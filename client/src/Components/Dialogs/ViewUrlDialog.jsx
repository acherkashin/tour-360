import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogContent,
} from '@material-ui/core';
import DialogTitleWithClose from './DialogTItleWithClose';


class ViewUrlDialog extends React.Component {
    constructor(props) {
        super(props);

        this._handleClose = this._handleClose.bind(this);
    }

    _handleClose() {
        this.props.onClose({ origin: this });
    }

    render() {
        const { isOpened, title, url } = this.props;

        return (
            <Dialog
            fullScreen
                onClose={this._handleClose}
                open={isOpened}
                // maxWidth={'sm'}
                fullWidth>
                <DialogTitleWithClose onClose={this._handleClose}>{title}</DialogTitleWithClose>
                <DialogContent>
                    <iframe title='Preview Place' src={url} style={{ height: '100%', width: '100%' }}></iframe>
                </DialogContent>
            </Dialog>
        );
    }
}

ViewUrlDialog.propTypes = {
    title: PropTypes.string.isRequired,
    // url: PropTypes.string.isRequired,
    isOpened: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
};

export default ViewUrlDialog;