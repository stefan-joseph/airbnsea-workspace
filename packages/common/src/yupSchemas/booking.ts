import * as yup from "yup";
import dayjs = require("dayjs");
import { dateFormat } from "../constants/constants";

export const invalidDate = "Invalid date";
export const datesInPast = "Booking dates must not be in the past";
export const invalidLengthOfStay = "Must stay a minimum of 1 night";
export const minGuests = "At least 1 guest is required";
export const maxGuests = "Limited to 16 guests";

export const dateValidation = yup
  .string()
  .required("Required")
  .test("is_correct_date_format", invalidDate, (value) =>
    dayjs(value, dateFormat, true).isValid()
  )
  .test(
    "is_before_current_date",
    datesInPast,
    (value) =>
      dayjs(value).isAfter(new Date(), "day") ||
      dayjs(value).isSame(new Date(), "day")
  );

export const endDateValidation = dateValidation.test(
  "is_after_start",
  invalidLengthOfStay,
  function (value) {
    const result = dayjs(value).isAfter(this.parent.start);

    return result;
  }
);

export const guestsValidation = yup
  .number()
  .required("Required")
  .min(1, minGuests)
  .max(16, maxGuests);

export const bookingSchema = yup.object().shape({
  start: dateValidation,
  end: endDateValidation,
  guests: guestsValidation,
});
