import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, staticAssetURL, Image, VrButton } from "react-360";
import VideoBackground from "../Background/VideoBackground";
import LabelButton from "./../Label/LabelButton";
import BackgroundManager from "./../Background/BackgroundManager";
import { BACKEND_URL } from '../../config';

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        layoutOrigin: [-0.5, -0.5],
    },
    text: {
        color: 'black',
    },
    vrButton: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    }
});

export default class ImageWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullScreen: false
        }
    }

    sizes = {
        width: this.props.widget.width,
        height: this.props.widget.height
    }

    _handleImageClick = () => {
        const { fullScreen } = this.state;
        const { widget } = this.props;
        this.setState({fullScreen: !fullScreen});

        if (!fullScreen) {
            this.sizes = {
                height: 600,
                width: 600 * (widget.width / widget.height), //Proportional increase
            }
        } else {
            this.sizes = {
                width: this.props.widget.width,
                height: this.props.widget.height
            }
        }
    }

    render() {
        const { widget } = this.props;

        return <View style={[styles.root, { transform: [{ translate: [widget.x, this.state.fullScreen ? 300 : widget.y], }] }]}>
            {widget.image ? 
                <View>
                    <Image 
                        source={{uri: `${BACKEND_URL}/${widget.image.filename}`}}
                        style={this.sizes}
                        onClick={this._handleImageClick}
                    />
                    <VrButton
                        onClick={this._handleImageClick}
                        style={styles.vrButton}
                    />
                </View> : null}
        </View>
    }
}

ImageWidget.propTypes = {
    widget: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.any,
    }),
}