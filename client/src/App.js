import React, { Component } from "react";
import ToursPage from './Pages/ToursPage';
import withRoot from './withRoot';

class App extends Component {
  render() {
    return (
      <ToursPage />
    );
  }
}

export default withRoot(App);