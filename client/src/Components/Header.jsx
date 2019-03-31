import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    Menu,
    MenuItem,
    Typography,
    IconButton,
} from '@material-ui/core';
import {
    Menu as MenuIcon,
    AccountCircle,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

const styles = {
    root: {
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const Header = inject("rootStore")(
    observer(class Header extends React.Component {
        state = {
            anchorEl: null,
        };

        get userStore() {
            return this.props.rootStore.userStore;
        }

        handleMenu = event => {
            this.setState({ anchorEl: event.currentTarget });
        };

        handleClose = () => {
            this.setState({ anchorEl: null });
        };

        handleSignOut = () => {
            this.userStore.signOut();
        };

        render() {
            const { classes } = this.props;
            const { anchorEl } = this.state;
            const auth = Boolean(this.userStore.siggnedIn && this.userStore.currentUser);
            const open = Boolean(anchorEl);

            return (
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton> */}
                            <Typography variant="h6" color="inherit" className={classes.grow}>Your virtual tours</Typography>
                            {auth && (
                                <div>
                                    <IconButton
                                        aria-owns={open ? 'menu-appbar' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                        <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                </div>
            );
        }
    })
);

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);