import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { grey, blue } from '@material-ui/core/colors';
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
    registerLink: {
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
    }
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
                    <Typography align="center" variant="h5" title="Login" className={classes.title}>{formatMessage(messages.signInPageTitle)}</Typography>
                    <div className={classes.profile}>
                        <hr className={classes.profileHr} />
                        <img src={require('../imgs/profile-icon.png')} alt="profile" className={classes.profileImg}/>
                    </div>
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
                    <div className={classes.ReCAPTCHA}>
                        <ReCAPTCHA
                            sitekey={SITEKEY}
                            onChange={this._handleReCAPTCHAChange}
                        />
                    </div>
                    {this.userStore.singInRejected && <Typography color="error">{formatMessage(messages.signInPageInvalidData)}</Typography>}
                    <LoadingButton
                        style={{ marginTop: '15px' }}
                        isLoading={this.userStore.signInLoading}
                        disabled={this.userStore.signInLoading || !isEmailValid || !isPasswordValid}
                        onClick={this._handleLogin}
                    >{formatMessage(messages.signInPageButtonTitle)}</LoadingButton>
                    <hr className={classes.hr}/>
                    <Link className={classes.registerLink} to="/sign-up">{formatMessage(messages.signInPageToRegister)}</Link>
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