import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { TextField, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { LoadingButton } from './../Components';
import { redirectWhenAuth } from '../HOC';
import { validEmail, validPassword } from '../utils/validate.js';
import ReCAPTCHA from "react-google-recaptcha";
import {SITEKEY} from "../config";
import { intlShape, injectIntl } from 'react-intl';

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
    registerLink: {
        alignSelf: 'flex-end',
    },
});

const SignInPage = redirectWhenAuth(inject("rootStore")(observer(
    class SignInPage extends React.Component {
        constructor(props) {
            const { messages, formatMessage } = props.intl;

            super(props);

            this.state = {
                email: '',
                isEmailValid: false,
                emailError: formatMessage(messages.fillOut),

                password: '',
                isPasswordValid: false,
                passwordError: formatMessage(messages.fillOut),

                ReCAPTCHAValue: null
            };

            this._handleEmailChanged = this._handleEmailChanged.bind(this);
            this._handlePasswordChanged = this._handlePasswordChanged.bind(this);
            this._handleLogin = this._handleLogin.bind(this);
            this._handleReCAPTCHAChange = this._handleReCAPTCHAChange.bind(this);
        }

        get userStore() {
            return this.props.rootStore.userStore;
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

        _handleLogin(e) {
            const { email, password, ReCAPTCHAValue } = this.state;

            this.userStore.signIn(email, password, ReCAPTCHAValue);
        }

        _handleReCAPTCHAChange(val) {
            this.setState({ ReCAPTCHAValue: val });
        }

        render() {
            const { classes } = this.props;
            const { 
                email, 
                password, 
                isEmailValid, 
                isPasswordValid, 
                emailError, 
                passwordError 
            } = this.state;
            const { messages, formatMessage } = this.props.intl;

            return <div className={classes.root}>
                <div className={classes.panel}>
                    <Typography align="center" variant="h5" title="Login">{formatMessage(messages.signInPageTitle)}</Typography>
                    <TextField
                        label={formatMessage(messages.email)}
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
                        label={formatMessage(messages.password)}
                        value={password}
                        type="password"
                        onChange={this._handlePasswordChanged}
                        margin="normal"
                        error={!isPasswordValid}
                        helperText={passwordError}
                        fullWidth={true}
                        required
                    />
                    <ReCAPTCHA
                        sitekey={SITEKEY}
                        onChange={this._handleReCAPTCHAChange}
                    />
                    {this.userStore.singInRejected && <Typography color="error">{formatMessage(messages.signInPageInvalidData)}</Typography>}
                    <Link className={classes.registerLink} to="/sign-up">{formatMessage(messages.signInPageToRegister)}</Link>
                    <LoadingButton
                        style={{ marginTop: '15px' }}
                        isLoading={this.userStore.signInLoading}
                        disabled={this.userStore.signInLoading || !isEmailValid || !isPasswordValid}
                        onClick={this._handleLogin}
                    >{formatMessage(messages.signInPageButtonTitle)}</LoadingButton>
                </div>
            </div >;
        }
    }
)));

SignInPage.propTypes = {
    classes: PropTypes.object.isRequired,
    
    intl: intlShape.isRequired,
}

export default withStyles(styles)(injectIntl(SignInPage));