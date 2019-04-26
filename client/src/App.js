import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Provider } from 'mobx-react';
import { IntlProvider } from 'react-intl';
import 'leaflet/dist/leaflet.css';
import withRoot from './withRoot';
import { SignInPage, SignUpPage, ToursPage, ViewMapPage, ProfilePage } from './Pages';
import RootStore from './Stores/RootStore';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { getMessages } from './languages';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    const rootStore = new RootStore();
    const messages = getMessages('ru');

    return (
      //TODO: replace with rootStore
      <Provider rootStore={rootStore}>
        <IntlProvider locale="en" messages={messages}>
          <Router>
            <div className={classes.root}>
              <Switch>
                <Route path="/tour/:tourId/view-tour" component={ViewMapPage} />
                <Route path="/tours" component={ToursPage} />
                <Route path="/sign-in" component={SignInPage} />
                <Route path="/sign-up" component={SignUpPage} />
                <Route path="/profile" component={ProfilePage} />
                {rootStore.userStore.siggnedIn && <Redirect to='/tours' />}
                {!rootStore.userStore.siggnedIn && <Redirect to='/sign-in' />}
              </Switch>
            </div>
          </Router>
        </IntlProvider>
      </Provider>
    );
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRoot(App));
