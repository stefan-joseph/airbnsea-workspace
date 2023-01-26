import dayjs from "dayjs";

export const formatDateRange = (start: string, end: string) =>
  `${dayjs(start).format("MMM. D")} - ${dayjs(end).format("MMM. D")}`;
