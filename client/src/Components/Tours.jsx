import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TourItem } from './';
import { observer } from 'mobx-react';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
});

const Tours = observer(class Tours extends React.Component {
    constructor(props) {
        super(props);

        this._handleItemClick = this._handleItemClick.bind(this);
    }

    _handleItemClick(tour) {
        this.props.onItemClick && this.props.onItemClick({ origin: this, tour });
    }

    render() {
        const { tours, classes, getActions, onItemClick } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {(tours || []).map(tour => (
                        <Grid key={tour.id} item>
                            <TourItem key={tour.id} tour={tour} getActions={getActions} onItemClick={onItemClick} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
});

Tours.propTypes = {
    classes: PropTypes.object.isRequired,
    tours: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        img: PropTypes.string,
        name: PropTypes.string,
    })),
    onItemClick: PropTypes.func.isRequired,
    getActions: PropTypes.func.isRequired,
};

export default withStyles(styles)(Tours);