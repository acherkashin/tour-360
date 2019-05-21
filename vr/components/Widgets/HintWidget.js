import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, asset, Animated } from "react-360";

const ANIMATION_DURATION = 500;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    layoutOrigin: [-0.5, -0.5],
  },
  image: {
    width: 32,
    height: 32
  },
  box: {
    padding: 10,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginLeft: 10,
    marginBottom: 10,
    width: 300,
    backgroundColor: "#fff",
    borderColor: "#639dda",
    borderWidth: 2
  },
  title: {
    fontSize: 20,
    color: '#000'
  }
});


export default class HintWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infoCardOpacity: new Animated.Value(0)
    };

    this._handleInfoEnter = this._handleInfoEnter.bind(this);
    this._handleInfoExit = this._handleInfoExit.bind(this);
  }

  _handleInfoEnter() {
    Animated.timing(this.state.infoCardOpacity, {
      toValue: 1,
      duration: ANIMATION_DURATION
    }).start();
  };

  _handleInfoExit() {
    Animated.timing(this.state.infoCardOpacity, {
      toValue: 0,
      duration: ANIMATION_DURATION
    }).start();
  };

  render() {
    const { x, y, content } = this.props.widget;

    return (
      <View 
        style={[ styles.root, { transform: [{ translate: [x, y], }] } ]} 
        onExit={this._handleInfoExit}
      >
        <Animated.View
          style={[styles.box, { opacity: this.state.infoCardOpacity }]}
        >
          <Text style={styles.title}>{content}</Text>
        </Animated.View>
        <Image
          source={asset("icons/info.svg")}
          style={styles.image}
          onEnter={this._handleInfoEnter}
        />
      </View>
    );
  }
}

HintWidget.propTypes = {
  widget: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
  }),
}