import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, staticAssetURL } from "react-360";
import VideoBackground from "../Background/VideoBackground";
import LabelButton from "./../Label/LabelButton";
import BackgroundManager from "./../Background/BackgroundManager";

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
    }

    render() {
        const { widget } = this.props;

        return <View style={[styles.root, { transform: [{ translate: [widget.x, widget.y], }] }]}>
            <LabelButton
                icon={'icons/play.png'}
                onClick={(e) => {
                    BackgroundManager.pushVideoBackground({
                        muted: widget.muted,
                        volume: widget.volume,
                        url: staticAssetURL('video/360_0087.mp4'),
                    });
                }}
            />
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
