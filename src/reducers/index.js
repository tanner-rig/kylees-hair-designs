import { combineReducers } from 'redux';

import userReducer from './userReducer';
import appointmentsReducer from './appointmentsReducer';
import clientsReducer from './clientsReducer';

const rootReducer = combineReducers({
  appointments: appointmentsReducer,
  clients: clientsReducer,
  user: userReducer
});

export default rootReducer;
