import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    Input,
    TextField
} from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import DialogTitleWithClose from './DialogTItleWithClose';
import { injectIntl, intlShape } from 'react-intl';

const styles = createStyles(theme => ({
}));

interface EditIconDialogProps extends WithStyles<typeof styles> {
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
    constructor(props: EditIconDialogProps) {
        super(props);

        this._handleClose = this._handleClose.bind(this);
        this._handleSaveClick = this._handleSaveClick.bind(this);
    }

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
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div>
                            <img src={url} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                label="Width"
                                value={width}
                                onChange={(e) => console.log(e)}
                                type="number"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 128,
                                    min: 1,
                                    step: 2,
                                }}
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                label="Height"
                                value={height}
                                onChange={(e) => console.log(e)}
                                type="number"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: 128,
                                    min: 1,
                                    step: 2,
                                }}
                                fullWidth
                            />
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

export default injectIntl(withStyles(styles)(EditIconDialog));
