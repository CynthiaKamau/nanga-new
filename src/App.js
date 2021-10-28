import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

// core components
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import LoginPage from "views/Pages/Login";
import User from "layouts/User";
import TeamLead from "layouts/TeamLead";

const App = () => {

  const hist = createBrowserHistory();

  const { REACT_APP_SERVER_URL } = process.env;

  axios.defaults.baseURL = `http://${REACT_APP_SERVER_URL}`;

  return (
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/user" component={User} />
        <Route path="/auth/login-page" component={LoginPage} />
        <Route path="/teamlead" component={TeamLead} />
        <Route path="/rtl" component={RTL} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  );
}

export default App;