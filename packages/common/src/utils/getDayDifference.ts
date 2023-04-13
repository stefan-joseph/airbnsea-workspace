import dayjs = require("dayjs");

export const getDayDifference: (start: string, end: string) => number = (
  start,
  end
) => dayjs(end).diff(dayjs(start), "day");
