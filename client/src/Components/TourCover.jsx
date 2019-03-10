import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    cover: {
        width: '100%',
        height: '100%',
    },
    noCover: {
        maxWidth: '100%',
        maxHeight: '100%',
        padding: theme.spacing.unit * 6,
    },
});

export class TourCover extends PureComponent {
    render() {
        const { classes, imageUrl, hasImage, name } = this.props;
        const className = hasImage ? classes.cover : classes.noCover;

        return (<img className={className} src={imageUrl} alt={name} />);
    }
}

TourCover.propTypes = {
    classes: PropTypes.object.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hasImage: PropTypes.bool.isRequired,
};

export default withStyles(styles)(TourCover);
