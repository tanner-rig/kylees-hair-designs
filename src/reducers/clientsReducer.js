import { clone, remove } from "lodash";
import {
  CREATE_CLIENT,
  DELETE_CLIENT,
  GET_CLIENTS,
  UPDATE_CLIENT
} from "../actions/types";

const initialState = {
  clientsList: [],
  currentClient: {
    clientId: '',
    firstName: '',
    lastName: '',
    waiver: '',
    phone: '',
    contactMethod: '',
    fb: '',
    ig: '',
    sc: '',
    personalBackground: '',
    hairHistory: '',
    email: '',
    dob: '',
    allergies: '',
    preferredPayment: '',
    notes: '',
    clientStatus: '',
    createdAt: '',
    updatedAt: ''
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
  case CREATE_CLIENT:
    return {
      clientsList: [...state.clientsList, action.payload],
      currentClient: action.payload
    };
  case DELETE_CLIENT:
    return {
      clientsList: remove(clone(state.clientsList), client => {
        return client.clientId === action.payload;
      }),
      currentClient: initialState.currentClient
    };
  case GET_CLIENTS:
    return { ...state, clientsList: action.payload };
  case UPDATE_CLIENT:
    return {
      clientsList: state.clientsList.map(client => {
        if (client.clientId === action.payload.clientId) {
          return action.payload;
        }

        return client;
      }),
      currentClient: action.payload
    };
  default:
    return state;
  }
}
