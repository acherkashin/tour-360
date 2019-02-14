import React from 'react';
import PropTypes from 'prop-types';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { TourCover } from '.';
import { observer } from 'mobx-react';

const styles = theme => ({
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
});

const Tour = observer(class Tour extends React.Component {
    constructor(props) {
        super(props);

        this._handleItemClick = this._handleItemClick.bind(this);
    }

    state = {
        anchorEl: null,
    };

    _handleItemClick(e) {
        this.props.onItemClick && this.props.onItemClick({ origin: this, tour: this.props.tour });
    }

    handleMoreClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { tour, classes, actions } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (<>
            <GridListTile
                component='div'
                key={tour.id}
                className={classes.tileItem}
                onClick={this._handleItemClick}
            >
                <TourCover hasImage={tour.hasImage} name={tour.name} imageUrl={tour.imageUrl} />
                <GridListTileBar
                    className={classes.tileItemBar}
                    title={tour.name}
                    actionIcon={
                        <IconButton className={classes.moreIcon} onClick={this.handleMoreClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
            </GridListTile>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                {actions.map(action => (
                    <MenuItem key={action.text} className={classes.menuItem} onClick={() => action.action({ origin: this, tour })}>
                        <ListItemIcon>
                            {action.icon}
                        </ListItemIcon>
                        <ListItemText primary={action.text} />
                    </MenuItem>
                ))}
            </Menu>
        </>);
    }
});

Tour.propTypes = {
    classes: PropTypes.object.isRequired,
    tour: PropTypes.shape({
        id: PropTypes.string,
        img: PropTypes.string,
        name: PropTypes.string,
    }),
    onItemClick: PropTypes.func,
    actions: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.object.isRequired,
        text: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
    })).isRequired
};

export default withStyles(styles)(Tour);
