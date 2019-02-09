import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    cover: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
    noCover: {
        maxWidth: '100%',
        maxHeight: '100%',
        padding: theme.spacing.unit * 6,
    },
});

export class TourCover extends React.Component {
    render() {
        const { classes, tour } = this.props;
        const url = tour.hasImage ? `/api/tour/${tour.id}/cover` : '/src/no-image.png';
        const className = tour.hasImage ? classes.cover : classes.noCover;

        return (<img className={className} src={url} alt={tour.name} />);
    }
}

TourCover.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TourCover);
