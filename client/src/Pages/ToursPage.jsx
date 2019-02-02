import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TourService } from '../api';
import { Header, CreateTourDialog, Tours } from '../Components';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const styles = theme => ({
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
    page: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1, 
    },
    toursContainer: {
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '12px',
    }
});

class ToursPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenedCreateDialog: false,
            tours: [],
            newTourName: '',
        };

        this.handleOnAddClick = this.handleOnAddClick.bind(this);
        this.handleOnCreateClick = this.handleOnCreateClick.bind(this);
        this.loadAllServices = this.loadAllServices.bind(this);
        this.handleTextChanged = this.handleTextChanged.bind(this);
    }

    loadAllServices() {
        TourService.getAll().then(resp => {
            this.setState({
                tours: resp.data.tours,
            });
        });
    }

    componentDidMount() {
        this.loadAllServices();
    }

    handleOnAddClick() {
        this.setState({
            isOpenedCreateDialog: true,
            newTourName: `New Tour ${this.state.tours.length + 1}`,
        });
    }

    handleOnCreateClick(event) {
        this.setState({ isOpenedCreateDialog: false });
        TourService.create(event.name).then(this.loadAllServices);
    }

    handleTextChanged(event) {
        this.setState({ newTourName: event.name });
    }

    render() {
        const { classes } = this.props;
        const { isOpenedCreateDialog } = this.state;
        const tours = this.state.tours.map(tour => ({
            id: tour._id,
            img: tour.image,
            name: tour.name,
        }))

        return (<div className={classes.page}>
            <Header />
            <CreateTourDialog
                name={this.state.newTourName}
                isOpened={isOpenedCreateDialog}
                onCreateClick={this.handleOnCreateClick}
                onNameChanged={this.handleTextChanged}
                onClose={() => { this.setState({ isOpenedCreateDialog: false }) }}
            />
            <div className={classes.toursContainer}>
                <Tours tours={tours} />
            </div>
            <Fab color="secondary" className={classes.absolute} onClick={this.handleOnAddClick} >
                <Add/>
            </Fab>
        </div>);
    }
}

ToursPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToursPage);