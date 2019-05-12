import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, staticAssetURL } from "react-360";
import VideoBackground from "./../Place/VideoBackground";
import LabelButton from "./../Label/LabelButton";

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        layoutOrigin: [-0.5, -0.5],
    },
    text: {
        color: 'black',
    }
});

export default class RunVideoWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
        };
    }

    render() {
        const { widget } = this.props;
        const { isPlaying } = this.state;

        return <View style={[styles.root, { transform: [{ translate: [widget.x, widget.y], }] }]}>
            <LabelButton
                icon={'icons/play.png'}
                onClick={(e) => this.setState({ isPlaying: true })}
            />
            {/* <Image
                source={asset('icons/play.png')}
                style={{ width: 30, height: 30 }}
            /> */}
            {isPlaying && <VideoBackground
                muted={widget.muted}
                volume={widget.volume}
                url={staticAssetURL('video/room.mp4')}
            />}
        </View>
    }
}

RunVideoWidget.propTypes = {
    widget: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        muted: PropTypes.bool.isRequired,
        volume: PropTypes.number.isRequired,
    }),
}
