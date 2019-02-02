import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    noImage: {
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

class Tours extends React.Component {
    constructor(props) {
        super(props);

        this._handleItemClick = this._handleItemClick.bind(this);
    }

    _handleItemClick(tour) {
        this.props.onItemClick && this.props.onItemClick({ origin: this, tour });
    }

    render() {
        const { tours, classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {(tours || []).map(tour => (
                        <Grid key={tour.id} item>
                            <GridListTile
                                key={tour.id} className={classes.tileItem}
                                component='div'
                                onClick={() => this._handleItemClick(tour)}
                            >
                                {tour.img && <img src={tour.img} alt={tour.name} />}
                                {!tour.img && <img className={classes.noImage} src={'/src/no-image.png'} alt={tour.name} />}
                                <GridListTileBar
                                    className={classes.tileItemBar}
                                    title={tour.name}
                                    actionIcon={
                                        <IconButton className={classes.icon}>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

Tours.propTypes = {
    classes: PropTypes.object.isRequired,
    tours: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        img: PropTypes.string,
        name: PropTypes.string,
    })),
    onItemClick: PropTypes.func,
};

export default withStyles(styles)(Tours);