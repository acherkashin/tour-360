import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { TextField, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { LoadingButton } from '../Components';
import { requireAuth } from '../HOC';
import { validEmail, validName } from '../utils/validate.js';

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
        padding: '30px 50px',
        borderRadius: 5,
    },
    registerLink: {
        alignSelf: 'flex-end',
    },
});

const ProfilePage = requireAuth(inject("rootStore")(observer(
    class ProfilePage extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                email: this.userStore.currentUser.email,
                isEmailValid: true,
                emailError: '',

                firstName: this.userStore.currentUser.firstName,
                isFirstNameValid: true,
                firstNameError: '',

                lastName: this.userStore.currentUser.lastName,
                isLastNameValid: true,
                lastNameError: '',
            };

            this._handleEmailChanged = this._handleEmailChanged.bind(this);
            this._handleFirstNameChanged = this._handleFirstNameChanged.bind(this);
            this._handleLastNameChanged = this._handleLastNameChanged.bind(this);
            this._handleSave = this._handleSave.bind(this);
        }

        get userStore() {
            return this.props.rootStore.userStore;
        }

        _handleEmailChanged(e) {
            const { value } = e.target;
            const { valid, error } = validEmail(value);
            this.setState({ email: value, isEmailValid: valid, emailError: error });
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

        _handleSave() {
            this.userStore.editUser({
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
            }).then((result) => {
                this.setState({
                    email: result.data.user.email,
                    firstName: result.data.user.firstName,
                    lastName: result.data.user.lastName,
                });
            });
        }

        render() {
            const { classes } = this.props;
            const { email, isEmailValid, emailError, firstName, isFirstNameValid, firstNameError, lastName, isLastNameValid, lastNameError } = this.state;

            return <div className={classes.root}>
                <div className={classes.panel}>
                    <Typography align="center" variant="h5" title="Profile">Profile</Typography>
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
                    <Link className={classes.registerLink} to="/tours">To tours</Link>
                    <LoadingButton
                        style={{ marginTop: '15px' }}
                        isLoading={this.userStore.editUserLoading}
                        disabled={this.userStore.editUserLoading || !isEmailValid || !isFirstNameValid || !isLastNameValid}
                        onClick={this._handleSave}
                    >Save</LoadingButton>
                </div>
            </div >;
        }
    }
)));

ProfilePage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfilePage);