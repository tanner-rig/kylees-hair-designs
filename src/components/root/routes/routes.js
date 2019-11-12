import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "../home";
import Clients from "../..//clients/clients";
import Login from "../../auth/login";
import RequireAuth from "./requireAuth";
import TopBar from "../../top-bar/TopBar";
import Appointments from "../../appointments/appointments";
import routes from "../../../constants/routes";

const history = createBrowserHistory();

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <TopBar history={history} />
        <Switch>
          <Route path={routes.home} exact component={Home} />
          <Route path={routes.clients} component={RequireAuth(Clients)} />
          <Route exact path="/admin">
            <Redirect to="/clients" />
          </Route>
          <Route
            path={routes.appointments}
            component={RequireAuth(Appointments)}
          />
          <Route path={routes.login} component={Login} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    );
  }
}
