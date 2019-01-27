import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TourService } from '../api';
import { Header, CreateTourDialog } from '../Components';
import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

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
            tours: []
        };

        this.handleOnAddClick = this.handleOnAddClick.bind(this);
    }

    componentDidMount() {
        TourService.getAll().then(resp => {
            this.setState({
                tours: resp.data.tours,
            });
        });
    }

    handleOnAddClick() {
        this.setState({ isOpenedCreateDialog: true });
    }

    render() {
        const { classes } = this.props;
        const { isOpenedCreateDialog } = this.state;

        return (<div className={classes.page}>
            <Header />
            <CreateTourDialog
                isOpened={isOpenedCreateDialog}
                onCreateClick={() => { this.setState({ isOpenedCreateDialog: false }) }}
                onClose={() => { this.setState({ isOpenedCreateDialog: false }) }}
            />
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