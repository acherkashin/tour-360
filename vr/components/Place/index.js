import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-360';
import Background from './Background';
import { CoordinateSystem, Portal, Label } from "./../index";
import agro from './../../static-places/agro';
import { WIDTH, HEIGHT } from './../../utils/CoordinateUtils';
import { BACKEND_URL } from './../../config'

export default class Place extends React.Component {
    constructor() {
        super();

        this.state = {
            currentPlace: agro
        };

        this._handlePortalClick = this._handlePortalClick.bind(this);
    }

    componentDidMount() {
    }

    _handlePortalClick(e) {
        this.props.onPortalClick({ origin: this, connection: e.connection });
    }

    render() {
        //https://stackoverflow.com/questions/43437907/vr-view-360-photo-sphere-images-possible-cors-issue?rq=1
        const { place } = this.props;
        const url = `${BACKEND_URL}/${place.image360Name}`;

        return (
            <View style={styles.place}>
                <Background
                    url={url}
                    sound={this.state.currentPlace.sound}
                />
                {/* <CoordinateSystem width={WIDTH} height={HEIGHT} stepX={200} stepY={100} /> */}
                {(place.connections || []).map(connection => <Portal key={connection.id} connection={connection} onClick={this._handlePortalClick} />)}
                {/* <Label
                    heading={' Курский Государственный Университет '}
                    onEyeClick={() => {
                        console.log('eye');
                    }}
                    onInfoClick={() => {
                        console.log('info');
                    }}
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    place: {
        width: WIDTH,
        height: HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

Place.propTypes = {
    place: PropTypes.shape({
        image360Name: PropTypes.string,
        connections: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            position: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
    onPortalClick: PropTypes.func.isRequired,
};