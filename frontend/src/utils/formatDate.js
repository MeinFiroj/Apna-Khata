import { format, isToday, isValid, isYesterday } from "date-fns";

export const formatRawDate = (value) => {
  let date = new Date(value);
  if (!isValid(date)) return "-";
  if (isToday(date)) return format(date, "'Today', hh:mm a");
  else if (isYesterday(date)) return format(date, "'Yesterday', hh:mm a");
  else return format(date, "dd MMM, yy. hh:mm a");
};