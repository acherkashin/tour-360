import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
  asset,
} from 'react-360';
import Place from './components/Place';

export default class Hello360 extends React.Component {
  // Our component will keep track of this state
  state = {
    count: 0,
  };

  // This method increments our count, triggering a re-render
  _incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };
  
  render() {
    // return (<Place imageUrl={asset("360-roof.png")} />);
    return (<Place />);
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1170 * 4, // 90 deg * 4
    height: 600,
    borderColor: 'red',
    borderWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'space-around',
    // alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('Hello360', () => Hello360);
