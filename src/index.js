import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import App from "./components/root/app";
import { store } from "./reduxStore";
import { AUTH_USER } from './actions/types';
import { isExpired } from './utils/jwtUtils';
import { getUserFromToken } from './actions/userActions';
import "./index.scss";

// Get token if one exists
const token = localStorage.getItem("token");

// If user has a token, and it's not expired, consider them authenticated
if (token) {
  if (!isExpired(token)) {
    // token is still valid
    store.dispatch({ type: AUTH_USER, payload: token });

    // Get the user
    store.dispatch(getUserFromToken(token));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("kylees-hair-designs")
);
