import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Header, Tours, ViewTourPanel, Placeholder } from '../Components';
import { CreateTourDialog, UploadImageDialog } from './../Components/Dialogs';
import { Fab } from '@material-ui/core';
import { Add, Edit, Delete } from '@material-ui/icons';
import { observer } from 'mobx-react';
import TourStore from './../Stores/TourStore';

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

const ToursPage = observer(class ToursPage extends React.Component {
    constructor(props) {
        super(props);

        this.store = new TourStore();

        this.state = {
            isOpenedCreateDialog: false,
            isOpenedUploadImageDialog: false,
            newTourName: '',
        };

        this.loadAllServices = this.loadAllTours.bind(this);

        this._handleOnAddClick = this._handleOnAddClick.bind(this);
        this._handleOnCreateClick = this._handleOnCreateClick.bind(this);
        this._handleTextChanged = this._handleTextChanged.bind(this);
        this._handleTourItemClick = this._handleTourItemClick.bind(this);
        this._handleImageChangeClick = this._handleImageChangeClick.bind(this);
        this._handleFileSelected = this._handleFileSelected.bind(this);
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
        this.store.create(event.name);
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
        const { isOpenedCreateDialog, isOpenedUploadImageDialog } = this.state;
        const selectedTour = this.store.selectedTour;
        const tours = this.store.tours;
        const hasTours = (tours || []).length > 0;

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
                    onFileSelected={this._handleFileSelected}
                    onClose={() => this.setState({ isOpenedUploadImageDialog: false })}
                />
                <div className={classes.contentWrapper}>
                    <div className={classes.content}>
                        <div className={classes.toursWrapper}>
                            {hasTours && <Tours
                                tours={tours}
                                onItemClick={this._handleTourItemClick}
                                actions={[{
                                    icon: <Edit />,
                                    text: 'Edit',
                                    action: (e) => {
                                        console.log(e);
                                    }
                                }, {
                                    icon: <Delete />,
                                    text: 'Delete',
                                    action: (e) => {
                                        this.store.delete(e.tour.id);
                                    }
                                }]}
                            />}
                            {!hasTours && <Placeholder onAddClick={this._handleOnAddClick} />}
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
});

ToursPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToursPage);