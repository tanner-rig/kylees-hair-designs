import axios from "axios";

import { API_URL } from "../constants";
import { getOptions } from "./actionUtils";
import {
  CREATE_CLIENT,
  DELETE_CLIENT,
  GET_CLIENTS,
  UPDATE_CLIENT
} from "./types";

export function createClient(body) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const options = getOptions();

      console.log("HEY: ", body, options);

      axios.post(`${API_URL}/clients`, body, options)
        .then(response => {
          const client = response.data;

          // create client in Redux state
          dispatch({ type: CREATE_CLIENT, payload: client });

          resolve();
        })
        .catch(err => {
          console.error("error getting clients: ", err);
          reject(err);
        });
    });
  };
}

export function deleteClient(clientId) {
  return dispatch => {
    const options = getOptions();

    axios.delete(`${API_URL}/clients/${clientId}`, options)
      .then(() => {
        // delete client in Redux state
        dispatch({ type: DELETE_CLIENT, payload: clientId });
      })
      .catch(err => {
        console.error("error getting clients: ", err.response);
      });
  };
}

export function getClients() {
  return dispatch => {
    const options = getOptions();

    axios.get(`${API_URL}/clients`, options)
      .then(response => {
        const clients = response.data.clients;

        // Add clients to redux
        dispatch({ type: GET_CLIENTS, payload: clients });
      })
      .catch(err => {
        console.error("error getting clients: ", err.response);
      });
  };
}

export function updateClient(body) {
  return dispatch => {
    const options = getOptions();

    axios.put(`${API_URL}/clients/${body.clientId}`, body, options)
      .then(response => {
        const client = response.data;

        // Update client in Redux state
        dispatch({ type: UPDATE_CLIENT, payload: client });
      })
      .catch(err => {
        console.error("error getting clients: ", err.response);
      });
  };
}
