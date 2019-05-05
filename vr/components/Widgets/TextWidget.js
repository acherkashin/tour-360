import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from "react-360";

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        layoutOrigin: [-0.5, -0.5],
    },
    text: {
        color: 'black',
    }
});

export default class TextWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { x, y, content } = this.props.options;

        return <View style={[styles.root, { transform: [{ translate: [x, y], }] }]}>
            <Text style={styles.text}>{content}</Text>
        </View>
    }
}

TextWidget.propTypes = {
    options: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
    }),
}
