import React from 'react';
import PropTypes from 'prop-types';
import { Environment, NativeModules } from 'react-360';
const { AudioModule } = NativeModules;

const DEFAULT_FORMAT = '2D';

export default class Background extends React.Component {
    constructor(props) {
        super();
        Environment.setBackgroundImage(props.url, { format: DEFAULT_FORMAT });
        if (props.sound) {
            AudioModule.playEnvironmental({
                source: props.sound,
                volume: 0.5,
            });
        } else {
            AudioModule.stopEnvironmental();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== this.props.url) {
            Environment.setBackgroundImage(nextProps.url, { format: DEFAULT_FORMAT });
        }
    }

    render() {
        return null;
    }
}

Background.propTypes = {
    url: PropTypes.string.isRequired,
    sound: PropTypes.string,
};
