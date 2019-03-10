import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-360';
import Place from './components/Place';
import { getUrlParams } from './utils';
import axios from 'axios';

export default class Hello360 extends React.Component {
    state = {
        currentPlace: null,
    };

    componentDidMount() {
        const urlParams = getUrlParams();

        if (urlParams.sessionId) {
            axios.get(`http://localhost:3001/api/tour-edit/${urlParams.sessionId}/place/${urlParams.placeId}`)
                .then((item) => {
                    this.setState({ currentPlace: item.data.place });
                });
        } else if (urlParams.tourId) {
            axios.get(`http://localhost:3001/api/tour/${urlParams.tourId}/place/${urlParams.placeId}`)
                .then((item) => {
                    this.setState({ currentPlace: item.data.place });
                });
        }
    }

    render() {
        if (this.state.currentPlace) {
            return (<Place place={this.state.currentPlace} />);
        } else {
            return <View></View>;
        }
    }
};

const styles = StyleSheet.create({
    panel: {
        // Fill the entire surface
        width: 1170 * 4, // 90 deg * 4
        height: 600,
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        justifyContent: 'space-around',
        // alignItems: 'center',
    },
    greetingBox: {
        padding: 20,
        backgroundColor: '#000000',
        borderColor: '#639dda',
        borderWidth: 2,
    },
    greeting: {
        fontSize: 30,
    },
});

AppRegistry.registerComponent('Hello360', () => Hello360);
