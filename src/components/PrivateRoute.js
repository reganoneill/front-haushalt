import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const realAuth = {
  authorize: arg => {
    if (arg) {
      return true;
    }
    console.log("no token");
    return false;
  }
};

const pRoute = ({ component: Component, user: user, ...rest }) => {
  console.log("token: ", user.token);
  return (
    <Route
      {...rest}
      render={props =>
        realAuth.authorize(usrr.token) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )}
    />
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const connectedProtectedRouteContainer = connect(mapStateToProps)(pRoute);

const PrivateRoute = withRouter(connectedProtectedRouteContainer);

export default PrivateRoute;
