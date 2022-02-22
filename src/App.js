import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import axios from "axios";
// import { useSelector } from "react-redux";

// core components
import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";
import LoginPage from "views/Pages/LoginPage";
import User from "layouts/User";

import "assets/scss/material-dashboard-pro-react.scss?v=1.10.0";
import moment from 'moment'

require('moment-timezone')
moment.tz.setDefault('Africa/Nairobi')

const App = () => {

  const hist = createBrowserHistory();

  // const { user : currentUser } = useSelector(state => state.auth);

  // const { REACT_APP_SERVER_URL } = process.env;

  axios.defaults.baseURL = `https://stratextestapi.uapoldmutual.com:8443/strategy/api/`;

  return (
    <BrowserRouter history={hist}>
    <Switch>
      <Route path="/rtl" component={RtlLayout} />
      <Route path="/auth" component={AuthLayout} />
      <Route path="/admin" component={AdminLayout} />
      <Route path="/user" component={User} />
      <Route path="/" component={LoginPage} />      
      
      {/* { !currentUser ? ( <Redirect from="/admin/dashboard" to="/" />) : null}  */}
    </Switch>
  </BrowserRouter>
  );
}

export default App;