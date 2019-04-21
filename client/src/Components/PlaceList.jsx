import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PlaceItem from './PlaceItem';
import { List, ListSubheader, Typography } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import classnames from 'classnames';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${grey[300]}`,
    },
});

class PlaceList extends React.Component {
    render() {
        const { classes, places, onClick, onViewClick, onRemoveClick, onEditClick, className } = this.props;
        const hasPlaces = places && places.length > 0;

        const root = classnames({
            [classes.root]: true,
            [className]: !!className,
        });

        return (
            <List className={root} subheader={<ListSubheader>Places</ListSubheader>} >
                {hasPlaces && (places || []).map(place => <PlaceItem
                    key={place.id}
                    place={place}
                    onClick={onClick}
                    onViewClick={onViewClick}
                    onRemoveClick={onRemoveClick}
                    onEditClick={onEditClick}
                />)}
                {!hasPlaces && <Typography align="center" variant="caption" color="textPrimary">No places</Typography>}
            </List>
        );
    }
}

export default withStyles(styles)(PlaceList);

PlaceList.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    places: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
    onViewClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
};
