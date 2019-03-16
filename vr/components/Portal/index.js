import React from 'react';
import PropTypes from 'prop-types';
import { Environment, NativeModules, View, Text } from 'react-360';
import { HEIGHT, degreeToPosition } from './../../utils/CoordinateUtils';
import { GazeButton } from './../'

export default class Portal extends React.Component {
    constructor(props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick() {
        this.props.onClick({ origin: this, connection: this.props.connection });
    }

    render() {
        const { connection } = this.props;
        const right = degreeToPosition(connection.position) || 0;
        const top = HEIGHT * 0.5;

        return (
            <View style={{
                position: 'absolute',
                transform: [{ translate: [right, top], }]
            }}>
                <GazeButton onClick={this._handleClick}>
                    <Text>{connection.name}</Text>
                </GazeButton>
            </View>
        );
    }
}

Portal.propTypes = {
    connection: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        position: PropTypes.number.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
};
