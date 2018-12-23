import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import PrivateRoute from "./PrivateRoute";

import SigninRoute from "./Signin";
import Landing from "./TuneJam-Container";

const Forofor = () => {
  return (
    <div>
      <h1>oh no</h1>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <div className="app">
        <Switch>
          <Route path="/signin" component={SigninRoute} />
          <PrivateRoute path="/profile" component={Landing} />
          <Route component={Forofor} />
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;
