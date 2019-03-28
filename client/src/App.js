import React, { Component } from "react";
import { Provider } from 'mobx-react';
import 'leaflet/dist/leaflet.css';
import withRoot from './withRoot';
import { SignInPage, SignUpPage, ToursPage } from './Pages';
import TourStore from './Stores/TourStore';
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
      //TODO: replace with rootStore
      <Provider tourStore={new TourStore()}>
        <Router>
          <div>
            <Route exact path="/" component={ToursPage} />
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default withRoot(App);