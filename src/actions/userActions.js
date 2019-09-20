import axios from "axios";

import { API_URL } from "../constants/env";
import { decodeToken } from "../utils/jwtUtils";
import { AUTH_USER, AUTH_ERROR, LOGOUT_USER, GET_USER } from "./types";

export function loginUser(username, password) {
  return dispatch => {
    const data = { username, password };
    axios
      .post(`${API_URL}/user/login`, data)
      .then(response => {
        const token = response.data.token;

        // Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER, payload: token });

        // Save the token to local storage
        localStorage.setItem("token", token);

        dispatch(getUserFromToken(token));

        // Clear existing error messages and user if any
        dispatch(clearAuthErrors());
      })
      .catch(err => {
        console.error("error logging in user: ", err.response);
        // Invalid username or Password - Should actually check off of status code in the future
        dispatch(authError("Incorrect username or password"));
      });
  };
}

export function clearAuthErrors() {
  return dispatch => {
    dispatch(authError(""));
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function logoutUser() {
  return dispatch => {
    localStorage.removeItem("token");

    dispatch({ type: LOGOUT_USER });
  };
}

export function getUserFromToken(token) {
  return dispatch => {
    const userFromToken = decodeToken(token);

    dispatch({ type: GET_USER, payload: userFromToken });
  };
}

// export function getUser(token) {
//   return dispatch => {
//     const options = { headers: { Authorization: token } };

//     axios
//       .get(`${API_URL}/user/authenticated`, options)
//       .then(response => {
//         const user = response.data.user;

//         // Update user in Redux state
//         dispatch({ type: GET_USER, payload: user });
//       })
//       .catch(err => {
//         console.error("error getting the user: ", err.response);
//       });
//   };
// }

// export function updateUser(body, token) {
//   return dispatch => {
//     const options = { headers: { Authorization: token } };

//     axios
//       .put(`${API_URL}/user`, body, options)
//       .then(response => {
//         const user = response.data.user;

//         // Update user in Redux state
//         dispatch({ type: UPDATE_USER, payload: user });
//       })
//       .catch(err => {
//         console.error("error updating the user: ", err.response);
//       });
//   };
// }
