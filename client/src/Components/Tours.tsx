import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { TourItem } from '.';
import { TourItemAction } from './TourItem';
import { observer } from 'mobx-react';
import { Tour } from "./../Stores";

const styles = createStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
}));

interface ToursProps extends WithStyles<typeof styles> {
    tours: Tour[];
    onItemClick: (event: { origin: Tours, tour: Tour }) => void;
    getActions: (event: { origin: Tours, tour: Tour }) => TourItemAction[];
}

class Tours extends React.Component<ToursProps> {
    constructor(props) {
        super(props);

        this._handleItemClick = this._handleItemClick.bind(this);
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
        tours: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            img: PropTypes.string,
            name: PropTypes.string,
        })),
        onItemClick: PropTypes.func.isRequired,
        getActions: PropTypes.func.isRequired,
    }

    _handleItemClick(tour: Tour) {
        this.props.onItemClick && this.props.onItemClick({ origin: this, tour });
    }

    render() {
        const classes: any = this.props.tours;
        const { tours, getActions, onItemClick } = this.props;

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
}

export default withStyles(styles)(observer(Tours));