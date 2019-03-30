import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import { Redirect } from "react-router-dom";

export default function requireAuth(WrappedComponent) {
  return inject("rootStore")(observer(
    class Authentication extends Component {
      render() {
        const siggnedIn = this.props.rootStore.userStore.siggnedIn;

        if (!siggnedIn) {
          return <Redirect to="/sign-in" />
        }

        return <WrappedComponent {...this.props} />
      }
    }));
}