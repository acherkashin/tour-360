import React from 'react';
import PropTypes from 'prop-types';
import { Environment } from 'react-360';
import VideoModule from 'VideoModule';
import BackgroundManager from './BackgroundManager';

export default class VideoBackground extends React.Component {
    constructor(props) {
        super();

        BackgroundManager.pushVideoBackground({
            url: props.url,
            volume: props.volume,
            muted: props.muted,
        });
    }

    render() {
        return null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== this.props.url) {
            BackgroundManager.popBackground();
            BackgroundManager.pushBackground({
                url: props.url,
                volume: props.volume,
                muted: props.muted,
            });
        }
    }
}

VideoBackground.propTypes = {
    url: PropTypes.string.isRequired,
    muted: PropTypes.bool,
    volume: PropTypes.number,
};
