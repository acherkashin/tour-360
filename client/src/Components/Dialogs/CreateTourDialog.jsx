import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, DialogActions, TextField, Select, FormControl, MenuItem, FormHelperText, InputLabel, Input } from '@material-ui/core';
import DialogTitleWithClose from './DialogTItleWithClose';

class CreateTourDialog extends React.Component {
    constructor(props) {
        super(props);

        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleNameChanged = this.handleNameChanged.bind(this);
        this._handleMapTypeChanged = this._handleMapTypeChanged.bind(this);
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

    _handleMapTypeChanged(e) {
        this.props.onMapTypeChanged && this.props.onMapTypeChanged({ origin: this, mapType: e.target });
    }

    render() {
        const { name, mapTypes, mapTypeValue } = this.props;

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
                        fullWidth={true}
                        autoFocus
                    />
                    <FormControl fullWidth>
                        <InputLabel htmlFor="name-disabled">Map type</InputLabel>
                        <Select
                            variant="filled"
                            fullWidth={true}
                            onChange={this._handleMapTypeChanged}
                            input={<Input name="name" id="name-disabled" />}
                            value={mapTypeValue}
                        >
                            {mapTypes.map(type => <MenuItem key={type.value} value={type.value}>{type.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCreateClick} color="primary">Create</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

CreateTourDialog.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    onNameChanged: PropTypes.func.isRequired,
    onCreateClick: PropTypes.func.isRequired,
    onMapTypeChanged: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    name: PropTypes.string,
    mapTypeValue: PropTypes.number.isRequired,
    mapTypes: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
};

export default CreateTourDialog;