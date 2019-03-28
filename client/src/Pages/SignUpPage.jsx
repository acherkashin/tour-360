import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { TextField, Typography, Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    panel: {
        width: '400px',
        backgroundColor: grey[100],
        border: `1px solid ${grey[300]}`,
        padding: 15,
        borderRadius: 5,
    },
    register: {
        marginTop: '15px',
    }
});

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        this._handleLastNameChanged = this._handleLastNameChanged.bind(this);
        this._handleFirstNameChanged = this._handleFirstNameChanged.bind(this);
        this._handleEmailChanged = this._handleEmailChanged.bind(this);
        this._handlePasswordChanged = this._handlePasswordChanged.bind(this);
        this._handleRepeatPasswordChanged = this._handleRepeatPasswordChanged.bind(this);
        this._handleRegisterClick = this._handleRegisterClick.bind(this);
    }

    _handleFirstNameChanged(e) {
        console.log(e.target.value);
    }

    _handleLastNameChanged(e) {
        console.log(e.target.value);
    }

    _handleEmailChanged(e) {
        console.log(e.target.value);
    }

    _handlePasswordChanged(e) {
        console.log(e.target.value);
    }

    _handleRepeatPasswordChanged(e) {
        console.log(e.target.value);
    }

    _handleRegisterClick() {

    }

    render() {
        const { classes } = this.props;
        const email = "";
        const password = "";
        const firstName = "";
        const lastName = "";

        return <div className={classes.root}>
            <div className={classes.panel}>
                <Typography align="center" variant="h5" title="Registration">Registration</Typography>
                <TextField
                    label="First Name"
                    value={firstName}
                    onChange={this._handleFirstNameChanged}
                    margin="normal"
                    fullWidth={true}
                    autoFocus
                />
                <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={this._handleLastNameChanged}
                    margin="normal"
                    fullWidth={true}
                    autoFocus
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={this._handleEmailChanged}
                    margin="normal"
                    fullWidth={true}
                    autoFocus
                />
                <TextField
                    label="Enter Password"
                    value={password}
                    type="password"
                    onChange={this._handlePasswordChanged}
                    margin="normal"
                    fullWidth={true}
                />
                <TextField
                    label="Repeat Password"
                    value={password}
                    type="password"
                    onChange={this._handleRepeatPasswordChanged}
                    margin="normal"
                    fullWidth={true}
                />
                <Button
                    className={classes.register}
                    fullWidth={true}
                    color="primary"
                    onClick={this._handleRegisterClick}
                >Register</Button>
            </div>
        </div>;
    }
}

SignUpPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignUpPage);