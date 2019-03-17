import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Polyline } from 'react-leaflet';

const styles = (theme) => { };

class Connection extends React.Component {
    constructor(props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(e) {
        this.props.onClick({ origin: this, connection: this.props.connection, lEvent: e });
    }

    render() {
        const { connection } = this.props;

        return (<Polyline
            color="blue"
            positions={[
                [connection.startPlace.latitude, connection.startPlace.longitude],
                [connection.endPlace.latitude, connection.endPlace.longitude]
            ]}
            onClick={this._handleClick}
        />)
    }
}

Connection.propTypes = {
    onClick: PropTypes.func.isRequired,
    connection: PropTypes.shape({
        startPlace: PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
        }),
        endPlace: PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
        }),
    }),
};

export default withStyles(styles)(Connection);
