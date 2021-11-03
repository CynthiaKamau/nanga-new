import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

// core components
import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";
import LoginPage from "views/Pages/LoginPage";

import "assets/scss/material-dashboard-pro-react.scss?v=1.10.0";

const App = () => {

  const hist = createBrowserHistory();

  const { user : currentUser } = useSelector(state => state.auth);

  // const { REACT_APP_SERVER_URL } = process.env;

  axios.defaults.baseURL = `http://172.27.11.20:5406/strategy/api/`;

  return (
    <BrowserRouter history={hist}>
    <Switch>
      <Route path="/rtl" component={RtlLayout} />
      <Route path="/auth" component={AuthLayout} />
      <Route path="/admin" component={AdminLayout} />
      <Route path="/" component={LoginPage} />
      { !currentUser ? ( <Redirect from="/" to="/admin/dashboard" />) : null} 
    </Switch>
  </BrowserRouter>
  );
}

export default App;