import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import {
    GridListTile,
    GridListTileBar,
    IconButton,
    MenuList,
    MenuItem,
    Popover,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { TourCover } from '.';
import { Tour } from './../Stores';

const styles = createStyles(theme => ({
    moreIcon: {
        color: 'white',
    },
    cover: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
    noCover: {
        padding: theme.spacing.unit * 6,
    },
    tileItem: {
        cursor: 'pointer',
        width: '300px',
        height: '300px',
        backgroundColor: 'white',
        border: `1px solid ${grey[300]}`,
        listStyle: 'none',
        '&:hover': {
            borderColor: theme.palette.primary.light,
            '& $tileItemBar': {
                backgroundColor: theme.palette.primary.light,
            }
        }
    },
    tileItemBar: {
        borderColor: theme.palette.primary.light,
    },
}));

export interface TourItemAction {
    text: string;
    icon: React.ReactElement;
    action: (event: { origin: TourItem, tour: Tour }) => void;
}

export interface TourItemProps extends WithStyles<typeof styles> {
    tour: Tour;
    onItemClick: (event: { origin: TourItem, tour: Tour }) => void;
    getActions: (event: { origin: TourItem, tour: Tour }) => TourItemAction[];
}

class TourItem extends React.Component<TourItemProps> {
    constructor(props) {
        super(props);

        this._handleItemClick = this._handleItemClick.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._handleActionClick = this._handleActionClick.bind(this);
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
        tour: PropTypes.shape({
            id: PropTypes.string,
            img: PropTypes.string,
            name: PropTypes.string,
        }),
        onItemClick: PropTypes.func,
        getActions: PropTypes.func.isRequired,
    };

    state = {
        anchorEl: null,
    };

    _handleClick(event) {
        event.stopPropagation();
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    _handleClose() {
        this.setState({
            anchorEl: null,
        });
    };

    _handleItemClick(e) {
        this.props.onItemClick && this.props.onItemClick({ origin: this, tour: this.props.tour });
    }

    _handleActionClick(action: TourItemAction) {
        action.action({
            origin: this,
            tour: this.props.tour,
        });
        this._handleClose();
    }

    render() {
        const classes: any = this.props.classes;
        const { tour, getActions } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (<>
            <GridListTile
                key={tour.id}
                className={classes.tileItem}
                onClick={this._handleItemClick}>
                <TourCover hasImage={tour.hasImage} name={tour.name} imageUrl={tour.imageUrl} />
                <GridListTileBar
                    className={classes.tileItemBar}
                    title={tour.name}
                    actionIcon={
                        <IconButton className={classes.moreIcon}
                            aria-owns={open ? 'simple-popper' : undefined}
                            aria-haspopup="true"
                            onClick={this._handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
            </GridListTile>
            <Popover
                id="simple-popper"
                open={open}
                anchorEl={anchorEl}
                onClose={this._handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <MenuList>
                    {getActions({
                        origin: this,
                        tour,
                    }).map(action => (
                        <MenuItem key={action.text} className={classes.menuItem} onClick={() => this._handleActionClick(action)}>
                            <ListItemIcon>
                                {action.icon}
                            </ListItemIcon>
                            <ListItemText primary={action.text} />
                        </MenuItem>
                    ))}
                </MenuList>
            </Popover>
        </>);
    }
}

export default withStyles(styles)(observer(TourItem));
