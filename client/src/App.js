import React, { Component } from "react";
import ToursPage from './Pages/ToursPage';
import withRoot from './withRoot';
import 'leaflet/dist/leaflet.css';

class App extends Component {
  render() {
    return (
      <ToursPage />
    );
  }
}

export default withRoot(App);