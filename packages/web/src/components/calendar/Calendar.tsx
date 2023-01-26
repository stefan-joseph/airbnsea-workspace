import { FormikHelpers } from "formik";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

import { DesktopCalendar } from "./components/DesktopCalendar";
import { MobileCalendar } from "./components/MobileCalendar";
import { Button, Stack } from "@mui/material";
import { BookingHeader } from "./components/BookingHeader";

type Props = {
  start: string | null;
  end: string | null;
  setFieldValue: FormikHelpers<any>["setFieldValue"];
  mobile?: boolean;
  bookingCalendar?: boolean;
  numOfMonthsDisplayed?: number;
  handleClose?: () => void;
};

export const Calendar = ({
  start,
  end,
  setFieldValue,
  mobile,
  bookingCalendar,
  numOfMonthsDisplayed,
  handleClose,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isStartSelection, setIsStartSelection] = useState<boolean>(
    !start || (start && end) ? true : false
  );

  const handleDateChange = (
    value: any,
    setCalendarOpen?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const formattedValue = dayjs(value).format("YYYY-MM-DD");
    if (isStartSelection) {
      setFieldValue("start", formattedValue);
      setFieldValue("end", null);
      if (bookingCalendar) {
        searchParams.set("start", formattedValue);
        searchParams.delete("end");
        setSearchParams(searchParams);
      }
      setIsStartSelection(false);
    } else if (!isStartSelection) {
      setFieldValue("end", formattedValue);
      if (bookingCalendar) {
        searchParams.set("end", formattedValue);
        setSearchParams(searchParams);
      }
      setIsStartSelection(true);
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
    <>
      {bookingCalendar && (
        <BookingHeader
          start={start}
          end={end}
          isStartSelection={isStartSelection}
          setIsStartSelection={setIsStartSelection}
        />
      )}
      <DesktopCalendar
        start={start}
        end={end}
        isStartSelection={isStartSelection}
        // setIsStartSelection={setIsStartSelection}
        handleChange={(value) => {
          handleDateChange(value);
        }}
        bookingCalendar={bookingCalendar}
      />
      {bookingCalendar && (
        <Stack
          direction="row"
          justifyContent="end"
          gap={3}
          sx={{ mt: -2, pb: 2, pr: 2 }}
        >
          <Button
            onClick={() => {
              setFieldValue("start", null);
              setFieldValue("end", null);
              searchParams.delete("start");
              searchParams.delete("end");
              setSearchParams(searchParams);
              setIsStartSelection(true);
            }}
          >
            Clear dates
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Stack>
      )}
    </>
  );
};
