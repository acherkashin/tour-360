import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Provider } from 'mobx-react';
import 'leaflet/dist/leaflet.css';
import withRoot from './withRoot';
import { SignInPage, SignUpPage, ToursPage } from './Pages';
import TourStore from './Stores/TourStore';
import { BrowserRouter as Router, Route } from "react-router-dom";

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      //TODO: replace with rootStore
      <Provider tourStore={new TourStore()}>
        <Router>
          <div className={classes.root}>
            <Route exact path="/" component={ToursPage} />
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRoot(App));
