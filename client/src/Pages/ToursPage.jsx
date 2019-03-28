import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Header, Tours, ViewTourPanel, NoToursPlaceholder } from '../Components';
import { CreateTourDialog, UploadImageDialog } from './../Components/Dialogs';
import { Fab } from '@material-ui/core';
import { Add, Edit, Delete, Visibility } from '@material-ui/icons';
import { observer, inject } from 'mobx-react';
import { Route } from "react-router-dom";
import TourDesigner from '../Components/TourDesigner/TourDesigner';

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

const ToursPage = inject("rootStore")(observer(
    class ToursPage extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                isOpenedCreateDialog: false,
                isOpenedUploadImageDialog: false,
                newTourName: '',
                newTourMapType: 'Image',
                mapTypes: ['Earth', 'Image'],
            };

            this.loadAllServices = this.loadAllTours.bind(this);

            this._handleOnAddClick = this._handleOnAddClick.bind(this);
            this._handleOnCreateClick = this._handleOnCreateClick.bind(this);
            this._handleNameChanged = this._handleNameChanged.bind(this);
            this._handleTourItemClick = this._handleTourItemClick.bind(this);
            this._handleImageChangeClick = this._handleImageChangeClick.bind(this);
            this._handleFileSelected = this._handleFileSelected.bind(this);
            this._handleCloseDesigner = this._handleCloseDesigner.bind(this);
            this._handleSaveChanges = this._handleSaveChanges.bind(this);
            this._handleMapTypeChanged = this._handleMapTypeChanged.bind(this);
        }

        get store() {
            return this.props.rootStore.tourStore;
        }

        loadAllTours() {
            this.store.loadTours();
        }

        componentDidMount() {
            this.loadAllTours();
        }

        _handleFileSelected(e) {
            this.store.updateCover(this.store.selectedTour.id, e.file).then(() => {
                this.setState({ isOpenedUploadImageDialog: false });
            });
        }

        _handleTourItemClick(e) {
            this.store.getById(e.tour.id).then((tour) => {
                this.store.selectedTour = tour;
            });
        }

        _handleOnAddClick() {
            this.setState({
                isOpenedCreateDialog: true,
                newTourName: `New Tour ${this.store.tours.length + 1}`,
            });
        }

        _handleOnCreateClick(event) {
            this.setState({ isOpenedCreateDialog: false });
            this.store.create(this.state.newTourName, this.state.newTourMapType);
        }

        _handleNameChanged(event) {
            this.setState({ newTourName: event.name });
        }

        _handleMapTypeChanged(event) {
            this.setState({ newTourMapType: event.mapType.value });
        }

        _handleImageChangeClick(event) {
            this.setState({ isOpenedUploadImageDialog: true });
            console.log(event);
        }

        _handleCloseDesigner(e) {
            this.store.cancelEditing();
        }

        _handleSaveChanges() {
            this.store.saveEditing();
        }

        _getActionsForTour(e, history) {
            const actions = [{
                icon: <Edit />,
                text: 'Edit',
                action: (e) => {
                    this.store.beginEditing(e.tour.id).then((sessionId) => {
                        history.push(`/tours/edit/${sessionId}`);
                    });
                }
            }, {
                icon: <Delete />,
                text: 'Delete',
                action: (e) => {
                    this.store.delete(e.tour.id);
                }
            }];

            if (e.tour.startPlaceId) {
                actions.push({
                    icon: <Visibility />,
                    text: 'View',
                    action: (e) => {
                        this.store.view(e.tour.id);
                    }
                });
            }

            return actions;
        }

        render() {
            const { classes } = this.props;
            const { isOpenedCreateDialog, isOpenedUploadImageDialog, mapTypes, newTourMapType } = this.state;
            const { selectedTour, tours, hasTours } = this.store;

            return (
                <div className={classes.root}>
                    <Header />
                    <CreateTourDialog
                        name={this.state.newTourName}
                        mapTypes={mapTypes}
                        mapTypeValue={newTourMapType}
                        isOpened={isOpenedCreateDialog}
                        onCreateClick={this._handleOnCreateClick}
                        onNameChanged={this._handleNameChanged}
                        onMapTypeChanged={this._handleMapTypeChanged}
                        onClose={() => this.setState({ isOpenedCreateDialog: false })}
                    />
                    <UploadImageDialog
                        title="Upload new photo"
                        prompt="Upload cover of your virtual tour"
                        isOpened={isOpenedUploadImageDialog}
                        onFileSelected={this._handleFileSelected}
                        onClose={() => this.setState({ isOpenedUploadImageDialog: false })}
                    />
                    <div className={classes.contentWrapper}>
                        <div className={classes.content}>
                            <div className={classes.toursWrapper}>
                                {hasTours && <Route render={({ history }) => (
                                    <Tours
                                        tours={tours}
                                        onItemClick={this._handleTourItemClick}
                                        getActions={(e) => this._getActionsForTour(e, history)}
                                    />)} />}
                                {!hasTours && <NoToursPlaceholder onAddClick={this._handleOnAddClick} />}
                                <Fab color="secondary" className={classes.addTour} onClick={this._handleOnAddClick} >
                                    <Add />
                                </Fab>
                            </div>
                            {selectedTour && <ViewTourPanel
                                width={`${window.innerWidth * 0.25}px`}
                                tour={selectedTour}
                                onImageChangeClick={this._handleImageChangeClick} />}
                            <Route path="/tours/edit/:sessionId" component={TourDesigner} />
                        </div>
                    </div>
                </div>
            );
        }
    })
);

ToursPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToursPage);