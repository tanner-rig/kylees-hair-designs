import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from './components/home';

const history = createBrowserHistory();

export default class Routes extends Component {
  render() {
    return (
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
        <Switch>
          <Route path={'/'} exact component={Home} />
        </Switch>
      </Router>
    );
  }
}