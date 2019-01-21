import React from 'react';
import { asset, VrButton, Animated, NativeModules } from 'react-360';
const { AudioModule } = NativeModules;

const GAZE_TIMEOUT = 1500; // 1.5s
const AnimatedButton = Animated.createAnimatedComponent(VrButton);

class GazeButton extends React.Component {

    constructor(props) {
        super(props);
        this.lastTimeoutId = 0;
        this.state = { hasFocus: false };
    }

    componentWillUnmount() {
        if (this.lastTimeoutId) {
            clearTimeout(this.lastTimeoutId);
        }
    }

    render() {
        const { onClick, onExit, onEnter, children, ...others } = this.props;
        return (
            <AnimatedButton
                {...others}
                onClick={() => {
                    AudioModule.playOneShot({
                        source: asset('audio/click.wav'),
                        volume: 0.5
                    });
                    onClick()
                }}
                onEnter={() => {
                    AudioModule.playOneShot({
                        source: asset('audio/hover.wav'),
                        volume: 0.5,
                    });
                    onEnter && onEnter();
                    this.setState({ hasFocus: true });
                    this.lastTimeoutId = setTimeout(() => {
                        this.setState({ hasFocus: false });
                        onClick();
                    }, GAZE_TIMEOUT);
                }}
                onExit={() => {
                    onExit && onExit();
                    this.setState({ hasFocus: false });
                    clearTimeout(this.lastTimeoutId);
                    this.lastTimeoutId = 0;
                }}
            >
                {children}
            </AnimatedButton>
        );
    }
}

module.exports = GazeButton;