// Import - default
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export const formatTimeOnZone = (date: any) => {
  // Extend dayjs with plugins
  dayjs.extend(utc);

  // Set the default timezone based on user's location or preferences
  const formattedDate = dayjs(date).format("D/M/YYYY, h:mm:ss A");

  return formattedDate;
};

export const formatIsoStringDate = (isoDate?: string | null) => {
  if (!isoDate) {
    return "Invalid date";
  }
  return dayjs(isoDate).format("MMMM D, YYYY h:mm A");
};
