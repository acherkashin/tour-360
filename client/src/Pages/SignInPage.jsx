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
            super(props);

            this.state = {
                email: '',
                isEmailValid: false,
                emailError: 'please fill out this field',

                password: '',
                isPasswordValid: false,
                passwordError: 'please fill out this field'
            };

            this._handleEmailChanged = this._handleEmailChanged.bind(this);
            this._handlePasswordChanged = this._handlePasswordChanged.bind(this);
            this._handleLogin = this._handleLogin.bind(this);
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
            this.userStore.signIn(this.state.email, this.state.password);
        }

        render() {
            const { classes } = this.props;
            const { email, password, isEmailValid, isPasswordValid, emailError, passwordError } = this.state;

            return <div className={classes.root}>
                <div className={classes.panel}>
                    <Typography align="center" variant="h5" title="Login">Login</Typography>
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
                        label="Password"
                        value={password}
                        type="password"
                        onChange={this._handlePasswordChanged}
                        margin="normal"
                        error={!isPasswordValid}
                        helperText={passwordError}
                        fullWidth={true}
                        required
                    />
                    {this.userStore.singInRejected && <Typography color="error">Invalid Username or Password</Typography>}
                    <Link className={classes.registerLink} to="/sign-up">To Register?</Link>
                    <LoadingButton
                        style={{ marginTop: '15px' }}
                        isLoading={this.userStore.signInLoading}
                        disabled={this.userStore.signInLoading || !isEmailValid || !isPasswordValid}
                        onClick={this._handleLogin}
                    >Login</LoadingButton>
                </div>
            </div >;
        }
    }
)));

SignInPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignInPage);