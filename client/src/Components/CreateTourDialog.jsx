import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    createDialog: {

    }
});

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
        this.props.handleNameChanged && this.props.onNameChanged({ origin: this, name: event.target.value });
    }

    handleClose() {
        this.props.onClose && this.props.onClose({ origin: this });
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog className={classes.createDialog} onClose={this.handleClose} open={this.props.isOpened}>
                <DialogTitle>Create Virtual Tour</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Tour Name"
                        value={this.props.name}
                        onChange={this.handleNameChanged}
                        margin="normal"
                        variant="filled"
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
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateTourDialog);