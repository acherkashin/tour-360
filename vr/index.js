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
    constructor(props) {
        super(props);

        this.state = {
            currentPlace: null,
            sessionId: null,
            tourId: null,
            placeId: null,
        };

        this._handlePortalClick = this._handlePortalClick.bind(this);
    }

    componentDidMount() {
        const options = getUrlParams();

        this.setState({ sessionId: options.sessionId, tourId: options.tourId }, () => {
            this._fetchPlaceById(options.placeId);
        })
    }

    _handlePortalClick(e) {
        this._fetchPlaceById(e.connection.id);
    }

    _fetchPlaceById(placeId) {
        return this._getPlace(placeId).then((resp) => {
            this.setState({ currentPlace: resp.data.place });
        });
    }

    _getPlace(placeId) {
        const { sessionId, tourId } = this.state;
        if (sessionId) {
            return axios.get(`http://localhost:3001/api/tour-edit/${sessionId}/place/${placeId}`);
        } else if (tourId) {
            return axios.get(`http://localhost:3001/api/tour/${tourId}/place/${placeId}`);
        }
    }

    render() {
        if (this.state.currentPlace) {
            return (<Place place={this.state.currentPlace} onPortalClick={this._handlePortalClick} />);
        } else {
            return <View></View>;
        }
    }
};

AppRegistry.registerComponent('Hello360', () => Hello360);
