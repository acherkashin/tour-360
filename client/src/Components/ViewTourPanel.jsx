import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles, } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { observer } from 'mobx-react';
import {
    EditImage,
    PlaceList,
} from './';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 1,
        backgroundColor: grey[100],
        borderLeft: `1px solid ${grey[300]}`,
        padding: theme.spacing.unit * 2,
    },
    editImage: {
        width: '80%',
    },
    places: {
        marginTop: 20,
    }
});

const ViewTourPanel = observer(class ViewTourPanel extends React.Component {
    constructor(props) {
        super(props);

        this._handleImageChangeClick = this._handleImageChangeClick.bind(this);
    }

    _handleImageChangeClick() {
        this.props.onImageChangeClick({ origin: this, tour: this.props.tour });
    }

    render() {
        const { classes, width, tour } = this.props;

        return (
            <div className={classes.root} style={{ width: width || '250px' }}>
                <Typography variant="h4" gutterBottom align='center'>{tour.name}</Typography>

                <EditImage
                    className={classes.editImage}
                    hasImage={true}
                    name={tour.name}
                    imageUrl={tour.imageUrl}
                    onImageChangeClick={this._handleImageChangeClick}
                />

                <PlaceList
                    className={classes.places}
                    places={tour.places}
                    onViewClick={(e) => this.props.onViewPlaceClick({
                        origin: this,
                        place: e.place,
                        tour,
                    })}
                    onEditClick={(e) => this.props.onEditPlaceClick({
                        origin: this,
                        place: e.place,
                        tour,
                    })}
                />
            </div>
        );
    }
});

ViewTourPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    tour: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    width: PropTypes.string,
    onImageChangeClick: PropTypes.func.isRequired,
    onViewPlaceClick: PropTypes.func.isRequired,
    onEditPlaceClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(ViewTourPanel);