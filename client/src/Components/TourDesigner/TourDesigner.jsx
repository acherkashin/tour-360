import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Map, TileLayer, Popup, Circle } from 'react-leaflet';
import EditTourPanel from './EditTourPanel';
import { observer, inject } from 'mobx-react';

const styles = {
    appBar: {
        position: 'relative',
    },
    tourName: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    rightPanel: {
        flexBasis: 400,
    }
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const TourDesigner = inject("tourStore")(observer(class TourDesigner extends React.Component {
    constructor(props) {
        super(props);

        this._handleSave = this._handleSave.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleNameChanged = this._handleNameChanged.bind(this);
    }

    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    };

    _handleClose() {
        this.props.onClose && this.props.onClose({ origin: this });
    }

    _handleSave() {
        this.props.onSave && this.props.onSave({ origin: this });
    }

    _handleNameChanged(e) {
        console.log(e);
        this.editingTour.name = e.name;
    }

    get editingTour() {
        return this.props.tourStore.editingTour;
    }

    render() {
        const { classes } = this.props;
        const position = [this.state.lat, this.state.lng];

        return (
            <Dialog
                open={true}
                fullScreen
                onClose={this._handleClose}
                TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this._handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.tourName}>{this.editingTour.name}</Typography>
                        <Button color="inherit" onClick={this._handleSave}>save</Button>
                    </Toolbar>
                </AppBar>
                <div className={classes.content}>
                    <Map center={position} zoom={this.state.zoom} className={classes.map}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Circle center={position} radius={30} fill={true}>
                            <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
                        </Circle>
                    </Map>
                    <EditTourPanel tour={this.editingTour} onNameChanged={this._handleNameChanged} />
                </div>

            </Dialog>
        );
    }
}));

TourDesigner.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(TourDesigner);
