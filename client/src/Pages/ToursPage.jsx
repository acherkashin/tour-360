import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TourService } from '../api';
import { Header, Tours, ViewTourPanel } from '../Components';
import { CreateTourDialog, UploadImageDialog } from './../Components/Dialogs';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const styles = theme => ({
    addTour: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    contentWrapper: {
        flexGrow: 1,
        overflow: 'hidden',
        display: 'flex',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
    },
    toursWrapper: {
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '12px',
        flexGrow: 1,
    }
});

class ToursPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenedCreateDialog: false,
            isOpenedUploadImageDialog: false,
            tours: [],
            newTourName: '',
            selectedTour: null,
        };

        this.loadAllServices = this.loadAllServices.bind(this);

        this._handleOnAddClick = this._handleOnAddClick.bind(this);
        this._handleOnCreateClick = this._handleOnCreateClick.bind(this);
        this._handleTextChanged = this._handleTextChanged.bind(this);
        this._handleTourItemClick = this._handleTourItemClick.bind(this);
        this._handleImageChangeClick = this._handleImageChangeClick.bind(this);
    }

    loadAllServices() {
        TourService.getAll().then(resp => {
            this.setState({
                tours: resp.data.result,
            });
        });
    }

    componentDidMount() {
        this.loadAllServices();
    }

    _handleTourItemClick(e) {
        TourService.getById(e.tour.id).then((resp) => {
            this.setState({ selectedTour: resp.data.result });
        });
    }

    _handleOnAddClick() {
        this.setState({
            isOpenedCreateDialog: true,
            newTourName: `New Tour ${this.state.tours.length + 1}`,
        });
    }

    _handleOnCreateClick(event) {
        this.setState({ isOpenedCreateDialog: false });
        TourService.create(event.name).then(this.loadAllServices);
    }

    _handleTextChanged(event) {
        this.setState({ newTourName: event.name });
    }

    _handleImageChangeClick(event) {
        this.setState({ isOpenedUploadImageDialog: true });
        console.log(event);
    }

    render() {
        const { classes } = this.props;
        const { isOpenedCreateDialog, isOpenedUploadImageDialog, selectedTour } = this.state;
        const tours = this.state.tours.map(tour => ({
            id: tour._id,
            img: tour.image,
            name: tour.name,
        }))

        return (
            <div className={classes.root}>
                <Header />
                <CreateTourDialog
                    name={this.state.newTourName}
                    isOpened={isOpenedCreateDialog}
                    onCreateClick={this._handleOnCreateClick}
                    onNameChanged={this._handleTextChanged}
                    onClose={() => this.setState({ isOpenedCreateDialog: false })}
                />
                <UploadImageDialog
                    isOpened={isOpenedUploadImageDialog}
                    onClose={() => this.setState({ isOpenedUploadImageDialog: false })}
                />
                <div className={classes.contentWrapper}>
                    <div className={classes.content}>
                        <div className={classes.toursWrapper}>
                            <Tours
                                tours={tours}
                                onItemClick={this._handleTourItemClick}
                            />
                            <Fab color="secondary" className={classes.addTour} onClick={this._handleOnAddClick} >
                                <Add />
                            </Fab>
                        </div>
                        {selectedTour && <ViewTourPanel
                            width={`${window.innerWidth * 0.25}px`}
                            tour={selectedTour}
                            onImageChangeClick={this._handleImageChangeClick} />}
                    </div>
                </div>
            </div>
        );
    }
}

ToursPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToursPage);