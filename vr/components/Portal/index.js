import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-360';
import { degreeToPosition } from './../../utils/CoordinateUtils';
import { GazeButton } from './../'

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 12,
        justifyContent: 'center'
    }
});

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

        return (
            <GazeButton onClick={this._handleClick} style={[styles.root, { transform: [{ translate: [right, 30], }] }]}>
                <Text>{connection.name}</Text>
            </GazeButton>
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
