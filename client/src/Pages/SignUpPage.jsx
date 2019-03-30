import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { TextField, Typography, Button } from '@material-ui/core';
import { observer, inject } from 'mobx-react';

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

const SignUpPage = inject("rootStore")(observer(
    class SignUpPage extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                repeatPassword: '',
            };

            this._handleLastNameChanged = this._handleLastNameChanged.bind(this);
            this._handleFirstNameChanged = this._handleFirstNameChanged.bind(this);
            this._handleEmailChanged = this._handleEmailChanged.bind(this);
            this._handlePasswordChanged = this._handlePasswordChanged.bind(this);
            this._handleRepeatPasswordChanged = this._handleRepeatPasswordChanged.bind(this);
            this._handleRegisterClick = this._handleRegisterClick.bind(this);
        }

        get store() {
            return this.rootStore.userStore;
        }

        _handleFirstNameChanged(e) {
            this.setState({ firstName: e.target.value });
        }

        _handleLastNameChanged(e) {
            this.setState({ lastName: e.target.value });
        }

        _handleEmailChanged(e) {
            this.setState({ email: e.target.value });
        }

        _handlePasswordChanged(e) {
            this.setState({ password: e.target.value });
        }

        _handleRepeatPasswordChanged(e) {
            this.setState({ repeatPassword: e.target.value });
        }

        _handleRegisterClick() {
            this.store.signUp({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            });
        }

        render() {
            const { classes } = this.props;
            const { email, password, firstName, lastName, repeatPassword } = this.state;

            return <div className={classes.root}>
                <div className={classes.panel}>
                    <Typography align="center" variant="h5" title="Registration">Registration</Typography>
                    <TextField
                        label="First Name"
                        value={firstName}
                        onChange={this._handleFirstNameChanged}
                        margin="normal"
                        fullWidth={true}
                        required
                        autoFocus
                    />
                    <TextField
                        label="Last Name"
                        value={lastName}
                        onChange={this._handleLastNameChanged}
                        margin="normal"
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
                        fullWidth={true}
                    />
                    <TextField
                        label="Repeat Password"
                        value={repeatPassword}
                        type="password"
                        onChange={this._handleRepeatPasswordChanged}
                        margin="normal"
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
    })
);

SignUpPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignUpPage);