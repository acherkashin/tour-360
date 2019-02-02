import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle as MuiDialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    createDialog: {

    }
});

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 6,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
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
        this.props.onNameChanged && this.props.onNameChanged({ origin: this, name: event.target.value });
    }

    handleClose() {
        this.props.onClose && this.props.onClose({ origin: this });
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog className={classes.createDialog}
                onClose={this.handleClose}
                open={this.props.isOpened}
                maxWidth={'sm'}
                fullWidth>
                <DialogTitle onClose={this.handleClose}>Create Virtual Tour</DialogTitle>
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
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateTourDialog);