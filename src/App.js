import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

// core components
import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";
import LoginPage from "views/Pages/LoginPage";

import "assets/scss/material-dashboard-pro-react.scss?v=1.10.0";

const App = () => {

  const hist = createBrowserHistory();

  const { REACT_APP_SERVER_URL } = process.env;

  axios.defaults.baseURL = `http://${REACT_APP_SERVER_URL}`;

  return (
    <BrowserRouter history={hist}>
    <Switch>
      <Route path="/rtl" component={RtlLayout} />
      <Route path="/auth" component={AuthLayout} />
      <Route path="/admin" component={AdminLayout} />
      <Route path="/" component={LoginPage} />
      {/* <Redirect from="/" to="/admin/dashboard" /> */}
    </Switch>
  </BrowserRouter>
  );
}

export default App;