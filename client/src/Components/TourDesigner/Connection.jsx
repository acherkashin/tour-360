import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Polyline } from 'react-leaflet';

const styles = (theme) => { };

class Connection extends React.Component {
    render() {
        const { connection } = this.props;

        return (<Polyline
            color="blue"
            positions={[
                [connection.startPlace.latitude, connection.startPlace.longitude],
                [connection.endPlace.latitude, connection.endPlace.longitude]
            ]}
        />)
    }
}

Connection.propTypes = {
    connection: {
        startPlace: PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
        }),
        endPlace: PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
        }),
    }
};

export default withStyles(styles)(Connection);
