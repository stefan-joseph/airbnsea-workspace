import dayjs from "dayjs";

export const getDayDifference = (start: string, end: string) =>
  dayjs(end).diff(dayjs(start), "day");
