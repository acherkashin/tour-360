import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';

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
        width: '300px',
        height: '300px',
        listStyle: 'none',
        backgroundColor: 'white',
    }
});

class Tours extends React.Component {
    render() {
        const { tours, classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {(tours || []).map(tile => (
                        <Grid key={tile.id} item>
                            <GridListTile key={tile.id} className={classes.tileItem}>
                                {tile.img && <img src={tile.img} alt={tile.name} />}
                                {!tile.img && <img className={classes.noImage} src={'/src/no-image.png'} alt={tile.name} />}
                                <GridListTileBar
                                    title={tile.name}
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
    tours: PropTypes.arrayOf(PropTypes.objectOf({
        id: PropTypes.string,
        img: PropTypes.string,
        name: PropTypes.string,
    }))
};

export default withStyles(styles)(Tours);