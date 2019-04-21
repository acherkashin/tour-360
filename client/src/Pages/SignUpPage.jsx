import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { TextField, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { redirectWhenAuth } from '../HOC';
import { LoadingButton } from './../Components';
import { validEmail, validPassword, validName, validConfirmationPassword } from '../utils/validate.js';
import ReCAPTCHA from "react-google-recaptcha";
import {SITEKEY} from "../config";

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    panel: {
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        backgroundColor: grey[100],
        border: `1px solid ${grey[300]}`,
        padding: 15,
        borderRadius: 5,
    },
    loginLink: {
        alignSelf: 'flex-end',
    }
});

const SignUpPage = redirectWhenAuth(inject("rootStore")(observer(
    class SignUpPage extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                firstName: '',
                isFirstNameValid: false,
                firstNameError: 'please fill out this field',

                lastName: '',
                isLastNameValid: false,
                lastNameError: 'please fill out this field',

                email: '',
                isEmailValid: false,
                emailError: 'please fill out this field',

                password: '',
                isPasswordValid: false,
                passwordError: 'please fill out this field',

                confirmationPassword: '',
                isConfirmationPasswordValid: false,
                confirmationPasswordError: 'please fill out this field',

                ReCAPTCHAValue: null
            };

            this._handleLastNameChanged = this._handleLastNameChanged.bind(this);
            this._handleFirstNameChanged = this._handleFirstNameChanged.bind(this);
            this._handleEmailChanged = this._handleEmailChanged.bind(this);
            this._handlePasswordChanged = this._handlePasswordChanged.bind(this);
            this._handleConfirmationPasswordChanged = this._handleConfirmationPasswordChanged.bind(this);
            this._handleRegisterClick = this._handleRegisterClick.bind(this);
            this._handleReCAPTCHAChange = this._handleReCAPTCHAChange.bind(this);
        }

        get userStore() {
            return this.props.rootStore.userStore;
        }

        _handleFirstNameChanged(e) {
            const { value } = e.target;
            const { valid, error } = validName(value);

            this.setState({ firstName: value, isFirstNameValid: valid, firstNameError: error });
        }

        _handleLastNameChanged(e) {
            const { value } = e.target;
            const { valid, error } = validName(value);

            this.setState({ lastName: value, isLastNameValid: valid, lastNameError: error });
        }

        _handleEmailChanged(e) {
            const { value } = e.target;
            const { valid, error } = validEmail(value);

            this.setState({ email: value, isEmailValid: valid, emailError: error });
        }

        _handlePasswordChanged(e) {
            const { value } = e.target;
            const { valid, error } = validPassword(value);

            this.setState({ password: value, isPasswordValid: valid, passwordError: error });
        }

        _handleConfirmationPasswordChanged(e) {
            const { value } = e.target;
            const { password } = this.state
            const { valid, error } = validConfirmationPassword({ confirmationPassword: value, password: password });

            this.setState({ confirmationPassword: value, isConfirmationPasswordValid: valid, confirmationPasswordError: error });
        }

        _handleRegisterClick() {
            const { ReCAPTCHAValue } = this.state;

            this.userStore.signUp({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }, ReCAPTCHAValue);
        }

        _handleReCAPTCHAChange(val) {
            this.setState({ ReCAPTCHAValue: val });
        }

        render() {
            const { classes } = this.props;
            const {
                email,
                password,
                firstName,
                lastName,
                confirmationPassword,
                isEmailValid,
                emailError,
                isPasswordValid,
                passwordError,
                isConfirmationPasswordValid,
                confirmationPasswordError,
                isFirstNameValid,
                firstNameError,
                isLastNameValid,
                lastNameError
            } = this.state;

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
                    <ReCAPTCHA
                        sitekey={SITEKEY}
                        onChange={this._handleReCAPTCHAChange}
                    />
                    <Link className={classes.loginLink} to="/sign-in">To Login?</Link>
                    <LoadingButton
                        style={{ marginTop: '15px' }}
                        disabled={!isEmailValid || !isPasswordValid || !isConfirmationPasswordValid || !isFirstNameValid || !isLastNameValid}
                        onClick={this._handleRegisterClick}
                    >Register</LoadingButton>
                </div>
            </div>;
        }
    }
)));

SignUpPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignUpPage);