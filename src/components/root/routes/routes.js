import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "../home";
import AdminDashboard from "../../admin/adminDashboard";
import Login from "../../auth/login";
import RequireAuth from "./requireAuth";
import TopBar from '../../top-bar/TopBar';
import Client from '../../clients/client';
import routes from "../../../constants/routes";

const history = createBrowserHistory();

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <TopBar />
        <Switch>
          <Route path={routes.home} exact component={Home} />
          <Route
            path={routes.dashboard}
            component={RequireAuth(AdminDashboard)}
          />
          <Route
            path={routes.client}
            component={RequireAuth(Client)}
          />
          <Route path={routes.login} component={Login} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    );
  }
}
