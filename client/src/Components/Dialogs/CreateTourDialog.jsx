import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogTitleWithClose from './DialogTItleWithClose';

class CreateTourDialog extends React.Component {
    constructor(props) {
        super(props);

        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleNameChanged = this.handleNameChanged.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleCreateClick() {
        this.props.onCreateClick && this.props.onCreateClick({ origin: this, name: this.props.name });
    }

    handleNameChanged(event) {
        this.props.onNameChanged && this.props.onNameChanged({ origin: this, name: event.target.value });
    }

    handleClose() {
        this.props.onClose && this.props.onClose({ origin: this });
    }

    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                open={this.props.isOpened}
                maxWidth={'sm'}
                fullWidth>
                <DialogTitleWithClose onClose={this.handleClose}>Create Virtual Tour</DialogTitleWithClose>
                <DialogContent>
                    <TextField
                        label="Tour Name"
                        value={this.props.name}
                        onChange={this.handleNameChanged}
                        margin="normal"
                        variant="filled"
                        fullWidth={true}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCreateClick} color="primary">Create</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

CreateTourDialog.propTypes = {
    isOpened: PropTypes.bool,
    onNameChanged: PropTypes.func,
    onCreateClick: PropTypes.func,
    onClose: PropTypes.func,
    name: PropTypes.string,
};

export default CreateTourDialog;