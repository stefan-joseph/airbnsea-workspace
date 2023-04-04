import { FormikHelpers } from "formik";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

import { DesktopCalendar } from "./components/DesktopCalendar";
import { MobileCalendar } from "./components/MobileCalendar";

type Props = {
  start: string | null;
  end: string | null;
  setFieldValue: FormikHelpers<any>["setFieldValue"];
  mobile?: boolean;
  bookingCalendar?: boolean;
  numOfMonthsDisplayed?: number;
  isStartSelection: boolean;
  setIsStartSelection: (value: boolean) => void;
  setCalendarOpen?: (value: boolean) => void;
};

export const Calendar = ({
  start,
  end,
  setFieldValue,
  mobile,
  bookingCalendar,
  numOfMonthsDisplayed,
  isStartSelection,
  setIsStartSelection,
  setCalendarOpen,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleDateChange = (value: any) => {
    const formattedValue = dayjs(value).format("YYYY-MM-DD");
    if (isStartSelection) {
      setFieldValue("start", formattedValue);
      if (end && dayjs(end).subtract(1, "day").isBefore(value)) {
        setFieldValue("end", null);
      }
      if (bookingCalendar) {
        searchParams.set("start", formattedValue);
        if (end && dayjs(end).subtract(1, "day").isBefore(value)) {
          searchParams.delete("end");
        }
        setSearchParams(searchParams);
      }
      setIsStartSelection(false);
    } else if (!isStartSelection) {
      if (start && dayjs(value).isBefore(start)) {
        setFieldValue("start", formattedValue);
        if (bookingCalendar) {
          searchParams.set("start", formattedValue);
          setSearchParams(searchParams);
        }
      } else {
        setFieldValue("end", formattedValue);
        if (bookingCalendar) {
          searchParams.set("end", formattedValue);
          setSearchParams(searchParams);
        }
        if (!start) {
          setIsStartSelection(true);
        }
      }

      setCalendarOpen && setCalendarOpen(false);
    }
  };

  if (mobile) {
    return (
      <MobileCalendar
        numOfMonthsDisplayed={numOfMonthsDisplayed || 4}
        start={start}
        end={end}
        isStartSelection={isStartSelection}
        handleChange={(value) => {
          handleDateChange(value);
        }}
        recallUnavailabiltyQuery={() => null}
      />
    );
  }

  return (
    <DesktopCalendar
      start={start}
      end={end}
      isStartSelection={isStartSelection}
      handleChange={(value) => {
        handleDateChange(value);
      }}
      bookingCalendar={bookingCalendar}
    />
  );
};
