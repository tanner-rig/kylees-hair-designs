import jwtDecode from "jwt-decode";
import moment from "moment";

import { getState } from "../reduxStore";

export const isExpired = token => {
  const decoded = jwtDecode(token);
  const now = moment().format();

  if (moment(moment.unix(decoded.exp).format()).isAfter(now, "day")) {
    // token is still valid
    return false;
  }

  return true;
};

export const getToken = () => {
  return getState().user.token;
};

export const decodeToken = (token) => {
  const decoded = jwtDecode(token);

  return { username: decoded.username, role: decoded.role };
};
