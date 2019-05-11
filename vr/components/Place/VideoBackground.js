import React from 'react';
import PropTypes from 'prop-types';
import { Environment } from 'react-360';
import VideoModule from 'VideoModule';

export default class VideoBackground extends React.Component {
    constructor(props) {
        super();

        const player = VideoModule.createPlayer('myplayer');
        player.play({
            source: { url: props.url }, // provide the path to the video
            volume: props.volume,
            muted: props.muted,
        });

        this.state = {
            player,
        };

        Environment.setBackgroundVideo('myplayer'); // or you can use player._player which is same value
    }

    render() {
        return null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== this.props.url) {
            console.log("Implement it!!!");
        }
    }
}

VideoBackground.propTypes = {
    url: PropTypes.string.isRequired,
    muted: PropTypes.bool,
    volume: PropTypes.number,
};
