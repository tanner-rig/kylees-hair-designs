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
    const options = getOptions();

    axios.post(`${API_URL}/appointments`, body, options)
      .then(response => {
        const appointment = response.data.appointment;

        // create appointment in Redux state
        dispatch({ type: CREATE_APPOINTMENT, payload: appointment });
      })
      .catch(err => {
        console.error("error getting appointments: ", err.response);
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

export function getAppointments() {
  return dispatch => {
    const options = getOptions();

    axios.get(`${API_URL}/appointments`, options)
      .then(response => {
        const appointments = response.data.appointments;

        // Add appointments to redux
        dispatch({ type: GET_APPOINTMENTS, payload: appointments });
      })
      .catch(err => {
        console.error("error getting appointments: ", err.response);
      });
  };
}

export function updateAppointment(body) {
  return dispatch => {
    const options = getOptions();

    axios.put(`${API_URL}/appointments/${body.appointmentId}`, body, options)
      .then(response => {
        const appointment = response.data.appointment;

        // Update appointment in Redux state
        dispatch({ type: UPDATE_APPOINTMENT, payload: appointment });
      })
      .catch(err => {
        console.error("error getting appointments: ", err.response);
      });
  };
}
