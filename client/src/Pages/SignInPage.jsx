import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { grey, green } from '@material-ui/core/colors';
import { TextField, Typography, Button, CircularProgress } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { redirectWhenAuth } from '../HOC';

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
    signIn: {
    },
    registerLink: {
        alignSelf: 'flex-end',
    },
    signInWrapper: {
        position: 'relative',
        marginTop: '15px',
    },
    signInProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
});

const SignInPage = redirectWhenAuth(inject("rootStore")(observer(
    class SignInPage extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                email: '',
                password: '',
            };

            this._handleEmailChanged = this._handleEmailChanged.bind(this);
            this._handlePasswordChanged = this._handlePasswordChanged.bind(this);
            this._handleLogin = this._handleLogin.bind(this);
        }

        get userStore() {
            return this.props.rootStore.userStore;
        }

        _handleEmailChanged(e) {
            this.setState({ email: e.target.value });
        }

        _handlePasswordChanged(e) {
            this.setState({ password: e.target.value });
        }

        _handleLogin(e) {
            this.userStore.signIn(this.state.email, this.state.password);
        }

        render() {
            const { classes } = this.props;
            const { email, password } = this.state;

            return <div className={classes.root}>
                <div className={classes.panel}>
                    <Typography align="center" variant="h5" title="Login">Login</Typography>
                    <TextField
                        label="Email"
                        value={email}
                        inputProps={{ type: 'email' }}
                        onChange={this._handleEmailChanged}
                        margin="normal"
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
                        fullWidth={true}
                        required
                    />
                    <Link className={classes.registerLink} to="/sign-up">To Register?</Link>
                    <div className={classes.signInWrapper}>
                        <Button
                            className={classes.signIn}
                            fullWidth={true}
                            disabled={this.userStore.signInLoading}
                            color="primary"
                            onClick={this._handleLogin}
                        >Login</Button>
                        {this.userStore.signInLoading && <CircularProgress size={24} className={classes.signInProgress} />}
                    </div>
                </div>
            </div >;
        }
    }
)));

SignInPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignInPage);