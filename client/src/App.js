import React, { Component } from "react";
import { Provider } from 'mobx-react';
import 'leaflet/dist/leaflet.css';
import withRoot from './withRoot';
import ToursPage from './Pages/ToursPage';
import TourStore from './Stores/TourStore';
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
      //TODO: replace with rootStore
      <Provider tourStore={new TourStore()}>
        <Router>
          <Route path="/" component={ToursPage}/>
        </Router>
      </Provider>
    );
  }
}

export default withRoot(App);