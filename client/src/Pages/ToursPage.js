import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import { TourService } from './../api';

const styles = theme => ({
});

class ToursPage extends React.Component {
    state = {
        tours: []
    };

    componentDidMount() {
        TourService.getAll().then(resp => {
            this.setState({
                tours: resp.data.tours,
            });
        });
    }

    render() {
        return (<div>
            {this.state.tours.length}
        </div>);
    }
}

ToursPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ToursPage));