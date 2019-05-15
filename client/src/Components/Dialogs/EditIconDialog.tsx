import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    Input
} from '@material-ui/core';
import DialogTitleWithClose from './DialogTItleWithClose';
import { injectIntl, intlShape } from 'react-intl';

interface EditIconDialogProps {
    intl: any;
    title: string;
    okButtonText: string;
    isOpened: boolean;
    url: string;
    width: number;
    height: number;
    onSaveClick: (e: { origin: EditIconDialog }) => void;
    onClose: (e: { origin: EditIconDialog }) => void;
}

export class EditIconDialog extends React.Component<EditIconDialogProps> {
    static propTypes = {
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        okButtonText: PropTypes.string,
        onSaveClick: PropTypes.func.isRequired,
        isOpened: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,

        intl: intlShape.isRequired,
    };

    _handleClose() {
        this.props.onClose({ origin: this });
    }

    _handleSaveClick() {
        this.props.onSaveClick({ origin: this });
    }

    render() {
        const { isOpened, title, url, width, height } = this.props;
        const { messages, formatMessage } = this.props.intl;

        return (
            <Dialog
                onClose={this._handleClose}
                open={isOpened}
                maxWidth={'sm'}
                fullWidth>
                <DialogTitleWithClose onClose={this._handleClose}>{title}</DialogTitleWithClose>
                <DialogContent>
                    <div>
                        <div>
                            <img src={url} />
                        </div>
                        <div>
                            <Input value={width} />
                            <Input value={height} />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this._handleSaveClick} color="primary" variant="contained" autoFocus>{formatMessage(messages.save)}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default injectIntl(EditIconDialog);
