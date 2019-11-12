import moment from "moment";

export const convertToUnix = date => {
  return new Date(date).getTime();
};

export const convertToDateStamp = date => {
  return moment.unix(date / 1000).format("MM/DD/YY");
};

export const convertToStandard = time => {
  if (time) {
    const splitTime = time.split(":");

    if (splitTime[0] > 12) {
      return `${splitTime[0] - 12}:${splitTime[1]}am (MST)`;
    } else if (splitTime[0] === 12) {
      return `${time}pm (MST)`;
    }

    return `${time}am (MST)`;
  }

  return time;
};
