import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CloudUpload from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { observer } from 'mobx-react';
import { TourCover } from './';

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
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    tile: {
        width: '80%',
        background: 'white',
        position: 'relative',
        border: `1px solid ${grey[300]}`,
        '&:hover': {
            '& $titleBar': {
                opacity: 1,
            },
        },
    },
    titleBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        background:
            `linear-gradient(to top, rgba(0,0,0,0.7) 0%,
            rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)`,
        opacity: 0,
        transition: 'all 200ms ease-in',
        height: theme.spacing.unit * 6,
        position: 'absolute',
        bottom: 0,
        cursor: 'pointer',
    },
    changeImageLabel: {
        color: 'white',
    },
    changeImageIcon: {
        color: 'white',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
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

                <div className={classes.tile}>
                    <TourCover hasImage={tour.hasImage} name={tour.name} imageUrl={tour.imageUrl} />
                    <div className={classes.titleBar} onClick={this._handleImageChangeClick}>
                        <Typography variant="subtitle1" align='center' inline={true} noWrap={true} className={classes.changeImageLabel}>Change image</Typography>
                        <CloudUpload className={classes.changeImageIcon} />
                    </div>
                </div>
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
};

export default withStyles(styles)(ViewTourPanel);