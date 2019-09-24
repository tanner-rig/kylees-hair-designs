import moment from "moment";

export const convertToUnix = date => {
  return new Date(date).getTime();
};

export const convertToDateStamp = date => {
  return moment.unix(date / 1000).format();
};
