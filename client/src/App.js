import React, { Component } from "react";
import ToursPage from './Pages/ToursPage';
import withRoot from './withRoot';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ToursPage />
    );
  }
}

export default withRoot(App);