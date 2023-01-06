export const getNextUnavailableDate = (
  date: string,
  dates: string[]
): string | null => {
  const formattedStart = date.split("-").join("");

  const nextUnavailableDate = [...dates]
    .map((d) => d.split("-").join(""))
    .sort((a, b) => a.localeCompare(b))
    .filter((d) => +d - +formattedStart > 0)[0];

  if (!nextUnavailableDate) return null;

  const reformattedNextUnavailableDate =
    nextUnavailableDate.slice(0, 4) +
    "-" +
    nextUnavailableDate.slice(4, 6) +
    "-" +
    nextUnavailableDate.slice(6, 8);

  return reformattedNextUnavailableDate;
};
