import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, VrButton, Animated } from "react-360";
import { degreeToPosition } from './../../utils/CoordinateUtils';
import { BACKEND_URL } from './../../config';

const INITIAL_PREVIEW_SIZE = 64;
const SCALED_PREVIEW_SIZE = 200;
const PREVIEW_ANIMATION_DURATION = 150;

export default class Portal extends React.Component {
    state = {
        isOverButton: false,
        isOverPreview: false,
        previewSize: new Animated.Value(INITIAL_PREVIEW_SIZE)
    };

    static propTypes = {
        connection: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            position: PropTypes.number.isRequired,
        }),
        onClick: PropTypes.func.isRequired,
    };

    handlePreviewEnter = () => {
        Animated.timing(this.state.previewSize, {
            toValue: SCALED_PREVIEW_SIZE,
            duration: PREVIEW_ANIMATION_DURATION
        }).start();

        this.setState({ isOverPreview: true });
    };

    handlePreviewExit = () => {
        Animated.timing(this.state.previewSize, {
            toValue: INITIAL_PREVIEW_SIZE,
            duration: PREVIEW_ANIMATION_DURATION
        }).start();

        this.setState({ isOverPreview: false });
    };

    handleButtonEnter = () => {
        this.setState({ isOverButton: true });
    };

    handleButtonExit = () => {
        this.setState({ isOverButton: false });
    };

    handleButtonClick = () => {
        this.props.onClick({ origin: this, connection: this.props.connection });
    };

    render() {
        const highlightedBoxStyle = {
            backgroundColor: this.state.isOverButton ? "#b36800" : "#ff9500"
        };

        const { connection } = this.props;
        const right = degreeToPosition(connection.position) || 0;
        const hasImage = connection.coverName != null;
        const imageUrl = `${BACKEND_URL}/${connection.coverName}`;

        return (
            <View style={[styles.root, { transform: [{ translate: [right, 30], }] }]}>
                <VrButton
                    style={[styles.box, highlightedBoxStyle]}
                    onEnter={this.handleButtonEnter}
                    onExit={this.handleButtonExit}
                    onClick={this.handleButtonClick}
                >
                    <Text style={styles.title}>{`${connection.name}`}</Text>

                    {hasImage && <Animated.Image
                        source={{ uri: imageUrl }}
                        onEnter={this.handlePreviewEnter}
                        onExit={this.handlePreviewExit}
                        style={[
                            styles.image,
                            {
                                width: this.state.previewSize,
                                height: this.state.previewSize,
                                borderWidth: this.state.isOverPreview ? 1 : 0
                            }
                        ]}
                    />}
                </VrButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
    },
    image: {
        borderRadius: 32,
        borderColor: "rgba(255, 255, 255, 1)"
    },
    box: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 20,
        padding: 20,
        minWidth: 130,
        minHeight: 40,
    },
    title: {
        fontSize: 20
    }
});
