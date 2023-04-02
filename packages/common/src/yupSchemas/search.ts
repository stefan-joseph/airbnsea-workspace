import * as yup from "yup";
import dayjs = require("dayjs");
import { dateFormat } from "../constants/constants";

const invalidDate = "Invalid date";
const invalidLengthOfStay = "Must stay a minimum of 1 night";
const minGuests = "At least 1 guest is required";
const maxGuests = "Limited to 16 guests";

export const dateValidationForSearch = yup
  .string()
  // .required("Required")
  .test(
    "is_correct_date_format",
    invalidDate,
    (value) => !value || dayjs(value, dateFormat, true).isValid()
  )
  .test(
    "is_before_current_date",
    invalidDate,
    (value) =>
      !value ||
      dayjs(value).isAfter(new Date(), "day") ||
      dayjs(value).isSame(new Date(), "day")
  )
  .nullable();

export const guestsValidationForSearch = yup
  .number()
  // .required("Required")
  .min(1, minGuests)
  .max(16, maxGuests)
  .nullable();

export const searchSchema = yup.object().shape({
  start: dateValidationForSearch,
  end: dateValidationForSearch.test(
    "is_after_start",
    invalidLengthOfStay,
    function (value) {
      return (
        !value || !this.parent.start || dayjs(value).isAfter(this.parent.start)
      );
    }
  ),
  guests: guestsValidationForSearch,
  where: yup.string().nullable(),
});
