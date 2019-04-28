import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Provider } from 'mobx-react';
import { observer, inject } from 'mobx-react';
import { addLocaleData, IntlProvider } from 'react-intl';
import 'leaflet/dist/leaflet.css';
import withRoot from './withRoot';
import { SignInPage, SignUpPage, ToursPage, ViewMapPage, ProfilePage } from './Pages';
import RootStore from './Stores/RootStore';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { getMessages } from './languages';

import enLocaleData from 'react-intl/locale-data/en';
import ruLocaleData from 'react-intl/locale-data/ru';
addLocaleData([...enLocaleData, ...ruLocaleData]);

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
  }
});


class App extends Component {
  render() {
    const rootStore = new RootStore();
    return (
      <Provider rootStore={rootStore}>
        <AppBody />
      </Provider>
    );
  }
}

const AppBody = withStyles(styles)(inject("rootStore")(observer(class AppBody extends Component {
  render() {
    const { classes, rootStore } = this.props;
    const locale = rootStore.userStore.currentUser && rootStore.userStore.currentUser.language || 'ru';
    console.log(locale);
    const messages = getMessages(locale);

    {/*TODO: use locale variable inside local prop */ }
    return <IntlProvider locale={'en'} messages={messages}>
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
    </IntlProvider>;
  }
})));

export default withRoot(App);
