import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { grey, blue } from '@material-ui/core/colors';
import { TextField, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { LoadingButton } from './../Components';
import { redirectWhenAuth } from '../HOC';
import { validEmail, validPassword, validName, validConfirmationPassword } from '../utils/validate.js';
import ReCAPTCHA from "react-google-recaptcha";
import { SITEKEY } from "../config";
import { intlShape, injectIntl } from 'react-intl';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: grey[100],
    },
    panel: {
        display: 'flex',
        flexDirection: 'column',
        width: '450px',
        backgroundColor: '#fff',
        border: `1px solid ${grey[300]}`,
        padding: '40px 15px',
        borderRadius: 5,
    },
    title: {
        color: blue[500],
        fontWeight: 'bold',
    },
    loginLink: {
        alignSelf: 'center',
        textDecoration: 'none',
        color: blue[500],
        textTransform: 'uppercase',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    profile: {
        position: 'relative',
    },
    hr: {
        backgroundColor: grey[300],
        border: 'none',
        height: 1,
        width: '100%',
        margin: '20px 0'
    },
    profileHr: {
        backgroundColor: grey[300],
        border: 'none',
        height: 1,
        width: '100%',
        position: 'absolute',
        top: 'calc(50% - 5px)',
    },
    profileImg: {
        width: '25%',
        display: 'block',
        margin: 'auto',
        borderRadius: '50%',
        backgroundColor: '#fff',
        zIndex: 2,
        position: 'relative',
        border: '10px solid white'
    },
    ReCAPTCHA: {
        margin: '20px auto 0'
    },
    inputsGroup: {
        display: 'flex',
        margin: '10px 0'
    },
    passwordInput: {
        marginRight: 10
    },
    confirmationPasswordInput: {
        marginLeft: 10
    },
    firstNameInput: {
        marginRight: 10
    },
    lastNameInput: {
        marginLeft: 10
    },
});

const SignUpPage = redirectWhenAuth(inject("rootStore")(observer(
    class SignUpPage extends React.Component {
        constructor(props) {
            const { messages, formatMessage } = props.intl;

            super(props);

            this.state = {
                firstName: '',
                isFirstNameValid: false,
                firstNameError: formatMessage(messages.fillOut),

                lastName: '',
                isLastNameValid: false,
                lastNameError: formatMessage(messages.fillOut),

                email: '',
                isEmailValid: false,
                emailError: formatMessage(messages.fillOut),

                password: '',
                isPasswordValid: false,
                passwordError: formatMessage(messages.fillOut),

                confirmationPassword: '',
                isConfirmationPasswordValid: false,
                confirmationPasswordError: formatMessage(messages.fillOut),

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
            const { messages, formatMessage } = this.props.intl;

            return <div className={classes.root}>
                <div className={classes.panel}>
                    <Typography variant="h5" align="center" className={classes.title}>{formatMessage(messages.signUpPageTitle)}</Typography>
                    <div className={classes.profile}>
                        <hr className={classes.profileHr} />
                        <img src={require('../imgs/profile-icon.png')} alt="profile" className={classes.profileImg}/>
                    </div>
                    <div className={classes.inputsGroup}>
                        <TextField
                            label={formatMessage(messages.firstName)}
                            value={firstName}
                            onChange={this._handleFirstNameChanged}
                            error={!isFirstNameValid}
                            helperText={firstNameError}
                            fullWidth={true}
                            required
                            autoFocus
                            className={classes.firstNameInput}
                        />
                        <TextField
                            label={formatMessage(messages.lastName)}
                            value={lastName}
                            onChange={this._handleLastNameChanged}
                            error={!isLastNameValid}
                            helperText={lastNameError}
                            fullWidth={true}
                            required
                            className={classes.lastNameInput}
                        />
                    </div>
                    <TextField
                        label={formatMessage(messages.email)}
                        value={email}
                        type="email"
                        onChange={this._handleEmailChanged}
                        error={!isEmailValid}
                        helperText={emailError}
                        fullWidth={true}
                        required
                    />
                    <div className={classes.inputsGroup}>
                        <TextField
                            label={formatMessage(messages.password)}
                            value={password}
                            type="password"
                            onChange={this._handlePasswordChanged}
                            error={!isPasswordValid}
                            helperText={passwordError}
                            fullWidth={true}
                            required
                            className={classes.passwordInput}
                        />
                        <TextField
                            label={formatMessage(messages.confirmationPassword)}
                            value={confirmationPassword}
                            type="password"
                            onChange={this._handleConfirmationPasswordChanged}
                            error={!isConfirmationPasswordValid || !isPasswordValid}
                            helperText={confirmationPasswordError}
                            fullWidth={true}
                            required
                            className={classes.confirmationPasswordInput}
                        />
                    </div>
                    <div className={classes.ReCAPTCHA}>
                        <ReCAPTCHA
                            sitekey={SITEKEY}
                            onChange={this._handleReCAPTCHAChange}
                        />
                    </div>
                    <LoadingButton
                        style={{ marginTop: '25px' }}
                        disabled={!isEmailValid || !isPasswordValid || !isConfirmationPasswordValid || !isFirstNameValid || !isLastNameValid}
                        onClick={this._handleRegisterClick}
                        size="large"
                    >{formatMessage(messages.signUpPageButtonTitle)}</LoadingButton>
                    <hr className={classes.hr}/>
                    <Link to="/sign-in" className={classes.loginLink}>{formatMessage(messages.signUpPageToLogin)}</Link>
                </div>
            </div>;
        }
    }
)));

SignUpPage.propTypes = {
    classes: PropTypes.object.isRequired,
    
    intl: intlShape.isRequired,
}

export default withStyles(styles)(injectIntl(SignUpPage));