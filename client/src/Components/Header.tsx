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
    AccountCircle as AccountCircleIcon,
    Map as MapIcon,
} from '@material-ui/icons';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { Redirect } from "react-router";
import { intlShape, injectIntl } from 'react-intl'
import { RootStore } from './../Stores';

const styles = createStyles({
    root: {
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    icon: {
        color: 'white',
    }
});

interface HeaderProps extends WithStyles<typeof styles> {
    intl: any;
    rootStore: RootStore;
    title: string;
}

interface HeaderState {
    anchorEl: HTMLElement;
    openedProfile: boolean;
    openedPublicTours: boolean;
}
class Header extends React.Component<HeaderProps, HeaderState> {
    state = {
        anchorEl: null,
        openedProfile: false,
        openedPublicTours: false,
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        intl: intlShape.isRequired,
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

    handleOpenProfile = () => {
        this.setState({ openedProfile: true });
    };

    render() {
        const { classes, title } = this.props;
        const { anchorEl, openedProfile, openedPublicTours } = this.state;
        const { messages, formatMessage } = this.props.intl;
        const auth = Boolean(this.userStore.siggnedIn && this.userStore.currentUser);
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6" color="inherit" className={classes.grow}>{title}</Typography>
                        <div>
                            <IconButton className={classes.icon} onClick={() => this.setState({ openedPublicTours: true })}>
                                <MapIcon />
                            </IconButton>
                            {auth && (
                                <>
                                    <IconButton
                                        className={classes.icon}
                                        aria-owns={open ? 'menu-appbar' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircleIcon />
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
                                        <MenuItem onClick={this.handleOpenProfile}>{formatMessage(messages.headerMyAccount)}</MenuItem>
                                        <MenuItem onClick={this.handleSignOut}>{formatMessage(messages.headerSignOut)}</MenuItem>
                                    </Menu>
                                </>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
                {openedProfile && <Redirect to='/profile' />}
                {openedPublicTours && <Redirect to='/public-tours' />}
            </div>
        );
    }
}

export default inject("rootStore")(
    observer(
        withStyles(styles)(injectIntl(Header))
    )
);