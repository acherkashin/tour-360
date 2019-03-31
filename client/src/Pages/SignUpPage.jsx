import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { TextField, Typography, Button } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { redirectWhenAuth } from '../HOC';
import { validate } from '../utils/validate.js';

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

const SignUpPage = redirectWhenAuth(inject("rootStore")(observer(
    class SignUpPage extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                firstName: '',
                isFirstNameValid: false,
                firstNameError: 'enter first name',

                lastName: '',
                isLastNameValid: false,
                lastNameError: 'enter last name',

                email: '',
                isEmailValid: false,
                emailError: 'enter email',

                password: '',
                isPasswordValid: false,
                passwordError: 'enter password',

                confirmationPassword: '',
                isConfirmationPasswordValid: false,
                confirmationPasswordError: 'enter password',
            };

            this._handleLastNameChanged = this._handleLastNameChanged.bind(this);
            this._handleFirstNameChanged = this._handleFirstNameChanged.bind(this);
            this._handleEmailChanged = this._handleEmailChanged.bind(this);
            this._handlePasswordChanged = this._handlePasswordChanged.bind(this);
            this._handleConfirmationPasswordChanged = this._handleConfirmationPasswordChanged.bind(this);
            this._handleRegisterClick = this._handleRegisterClick.bind(this);
        }

        get userStore() {
            return this.props.rootStore.userStore;
        }

        _handleFirstNameChanged(e) {
            const { value } = e.target;
            const { valid, error } = validate(value, 'name');
            this.setState({ firstName: value, isFirstNameValid: valid, firstNameError: error});
        }

        _handleLastNameChanged(e) {
            const { value } = e.target;
            const { valid, error } = validate(value, 'name');
            this.setState({ lastName: value, isLastNameValid: valid, lastNameError: error});
        }

        _handleEmailChanged(e) {
            const { value } = e.target;
            const { valid, error } = validate(value, 'email');
            this.setState({ email: value, isEmailValid: valid, emailError: error});
        }

        _handlePasswordChanged(e) {
            const { value } = e.target;
            const { valid, error } = validate(value, 'password');
            this.setState({ password: value, isPasswordValid: valid, passwordError: error});
        }

        _handleConfirmationPasswordChanged(e) {
            const { value } = e.target;
            const { password } = this.state
            const { valid, error } = validate({ confirmationPassword: value, password: password }, 'confirmationPassword');
            this.setState({ confirmationPassword: value, isConfirmationPasswordValid: valid, confirmationPasswordError: error });
        }

        _handleRegisterClick() {
            this.userStore.signUp({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            });
        }

        render() {
            const { classes } = this.props;
            const { email, password, firstName, lastName, confirmationPassword, isEmailValid, emailError, isPasswordValid, passwordError, isConfirmationPasswordValid, confirmationPasswordError, isFirstNameValid, firstNameError, isLastNameValid, lastNameError } = this.state;

            return <div className={classes.root}>
                <div className={classes.panel}>
                    <Typography align="center" variant="h5" title="Registration">Registration</Typography>
                    <TextField
                        label="First Name"
                        value={firstName}
                        onChange={this._handleFirstNameChanged}
                        margin="normal"
                        error={!isFirstNameValid}
                        helperText={firstNameError}
                        fullWidth={true}
                        required
                        autoFocus
                    />
                    <TextField
                        label="Last Name"
                        value={lastName}
                        onChange={this._handleLastNameChanged}
                        margin="normal"
                        error={!isLastNameValid}
                        helperText={lastNameError}
                        fullWidth={true}
                        required
                        autoFocus
                    />
                    <TextField
                        label="Email"
                        value={email}
                        inputProps={{ type: 'email' }}
                        onChange={this._handleEmailChanged}
                        margin="normal"
                        error={!isEmailValid}
                        helperText={emailError}
                        fullWidth={true}
                        required
                        autoFocus
                    />
                    <TextField
                        label="Enter Password"
                        value={password}
                        type="password"
                        onChange={this._handlePasswordChanged}
                        margin="normal"
                        error={!isPasswordValid}
                        helperText={passwordError}
                        fullWidth={true}
                    />
                    <TextField
                        label="Repeat Password"
                        value={confirmationPassword}
                        type="password"
                        onChange={this._handleConfirmationPasswordChanged}
                        margin="normal"
                        error={!isConfirmationPasswordValid || !isPasswordValid}
                        helperText={confirmationPasswordError}
                        fullWidth={true}
                        required
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
)));

SignUpPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignUpPage);