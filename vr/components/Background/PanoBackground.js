import React from 'react';
import PropTypes from 'prop-types';
import BackgroundManager from './BackgroundManager';

export default class PanoBackground extends React.Component {
    constructor(props) {
        super();

        this._applyBackground(props);
    }
    
    _applyBackground(props) {
        BackgroundManager.setImageBackground({
            url: props.url,
        }, {
            sound: props.sound,
            volume: 0.5,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== this.props.url) {
            this._applyBackground(nextProps);
        }
    }

    render() {
        return null;
    }
}

PanoBackground.propTypes = {
    url: PropTypes.string.isRequired,
    sound: PropTypes.string,
};
