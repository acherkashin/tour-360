import React, { Component } from "react";
import { Provider } from 'mobx-react';
import 'leaflet/dist/leaflet.css';
import withRoot from './withRoot';
import ToursPage from './Pages/ToursPage';
import TourStore from './Stores/TourStore';


class App extends Component {
  render() {
    return (
      //TODO: replace with rootStore
      <Provider tourStore={new TourStore()}>
        <ToursPage />
      </Provider>
    );
  }
}

export default withRoot(App);