import { clone, remove } from "lodash";
import {
  CREATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  GET_APPOINTMENTS,
  UPDATE_APPOINTMENT
} from "../actions/types";

const initialState = {
  appointmentsList: [],
  currentAppt: {
    appointmentId: '',
    clientId: '',
    service: '',
    productUsed: '',
    followUpDate: '',
    followUpTime: '',
    amountPaid: '',
    discountType: '',
    discountAmount: '',
    tip: '',
    time: '',
    duration: '',
    date: '',
    milesDriven: '',
    location: '',
    notes: '',
    retailItemsSold: '',
    retailItemsAmount: '',
    createdAt: '',
    updatedAt: ''
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
  case CREATE_APPOINTMENT:
    return {
      appointmentsList: [...state.appointmentsList, action.payload],
      currentAppt: action.payload
    };
  case DELETE_APPOINTMENT:
    return {
      appointmentsList: remove(clone(state.appointmentsList), appointment => {
        return appointment.appointmentId !== action.payload;
      }),
      currentAppt: initialState.currentAppt
    };
  case GET_APPOINTMENTS:
    return { ...state, appointmentsList: action.payload };
  case UPDATE_APPOINTMENT:
    return {
      appointmentsList: state.appointmentsList.map(appointment => {
        if (appointment.appointmentId === action.payload.appointmentId) {
          return action.payload;
        }

        return appointment;
      })
    };
  default:
    return state;
  }
}
