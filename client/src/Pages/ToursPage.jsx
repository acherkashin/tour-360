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
                onClose={() => { this.setState({ isOpenedCreateDialog: false }) }}
            />
            <Tours tours={tours} />
            <Fab color="secondary" className={classes.absolute}>
                <Add onClick={this.handleOnAddClick} />
            </Fab>
        </div>);
    }
}

ToursPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToursPage);