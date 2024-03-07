import axios from "axios";

import { API_URL } from "../constants";
import { getOptions } from './actionUtils';
import {
  CREATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  GET_APPOINTMENTS,
  UPDATE_APPOINTMENT
} from "./types";

export function createAppointment(body) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const options = getOptions();

      axios.post(`${API_URL}/appointments`, body, options)
        .then(res => {
          // create appointment in Redux state
          dispatch({ type: CREATE_APPOINTMENT, payload: res.data });

          resolve();
        })
        .catch(err => {
          console.error("error getting appointments: ", err.response);
          reject();
        });
    });
  };
}

export function deleteAppointment(appointmentId) {
  return dispatch => {
    const options = getOptions();

    axios.delete(`${API_URL}/appointments/${appointmentId}`, options)
      .then(() => {
        // delete appointment in Redux state
        dispatch({ type: DELETE_APPOINTMENT, payload: appointmentId });
      })
      .catch(err => {
        console.error("error getting appointments: ", err.response);
      });
  };
}

export function getAppointments(clientId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const options = getOptions();

      axios.get(`${API_URL}/appointments?clientId=${clientId}`, options)
        .then(response => {
          const appointments = response.data.appointments.sort((a, b) => {
            return a.date - b.date;
          })

          // Add appointments to redux
          dispatch({ type: GET_APPOINTMENTS, payload: appointments });
          resolve();
        })
        .catch(err => {
          console.error("error getting appointments: ", err.response);
          reject(err);
        });
    });
  };
}

export function updateAppointment(body) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const options = getOptions();

      axios.put(`${API_URL}/appointments/${body.appointmentId}`, body, options)
        .then(response => {
          const appointment = response.data.appointment;

          // Update appointment in Redux state
          dispatch({ type: UPDATE_APPOINTMENT, payload: appointment });

          resolve();
        })
        .catch(err => {
          console.error("error getting appointments: ", err.response);

          reject(err);
        });
    });
    
  };
}
