import { Box, Stack } from "@mui/material";
import {
  LocalizationProvider,
  StaticDatePicker,
  StaticDatePickerProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useGetListingUnavailabilityLazyQuery } from "@airbnb-clone/controller";

import { requiredCalendarProps, universalCalendarProps } from "../utils/utils";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "../../Loader";

type Props = {
  start: string | null;
  end: string | null;
  isStartSelection: boolean;
  handleChange: (value: any) => void;
  recallUnavailabiltyQuery?: any;
  bookingCalendar?: boolean;
};

export const DesktopCalendar = ({
  start,
  end,
  isStartSelection,
  handleChange,
  bookingCalendar,
  recallUnavailabiltyQuery,
}: Props) => {
  const [currentMonth, setCurrentMonth] = useState(
    start ? dayjs(start).startOf("month") : dayjs(new Date()).startOf("month")
  );

  const [dateHovered, setDateHovered] = useState<string | null>(null);

  const rightArrowRef = useRef<HTMLButtonElement>(null);
  const leftArrowRef = useRef<HTMLButtonElement>(null);

  const adapter = new AdapterDayjs();

  let { listingId } = useParams();
  const [getListingUnavailability, { data, loading, error }] =
    useGetListingUnavailabilityLazyQuery({
      variables: {
        listingId: listingId as string,
      },
    });

  useEffect(() => {
    // only calls unavailability query when its the booking calendar, not search calendar
    if (bookingCalendar) getListingUnavailability();
  }, [recallUnavailabiltyQuery]);

  const universalProps = universalCalendarProps(
    start,
    end,
    !!bookingCalendar,
    dateHovered,
    setDateHovered,
    isStartSelection,
    loading,
    data,
    handleChange
  );

  const desktopCalendarProps: StaticDatePickerProps<any, any> = {
    ...requiredCalendarProps(handleChange),
    onMonthChange: (month) => {
      if (dayjs(month).isAfter(currentMonth) && rightArrowRef.current) {
        rightArrowRef.current.click();
      } else if (leftArrowRef.current) {
        leftArrowRef && leftArrowRef.current.click();
      }
      setCurrentMonth(dayjs(month));
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" position="relative">
        {error && <ErrorMessage />}
        {loading && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{ transform: "translateX(-50%)" }}
          >
            <Loader color="info" />
          </Box>
        )}
        <StaticDatePicker
          {...requiredCalendarProps}
          {...universalProps}
          {...desktopCalendarProps}
          defaultCalendarMonth={adapter.date(dayjs(currentMonth))}
          componentsProps={{
            leftArrowButton: {
              sx: { position: "absolute", left: 22, top: 14 },
            },
            rightArrowButton: {
              sx: { position: "absolute", right: 22, top: 14 },
            },
            // paperContent: {
            //   sx: {
            //     "& .MuiPickersDay-root": {
            //       "&.Mui-selected": {
            //         backgroundColor: "red",
            //       },
            //     },
            //   },
            // },
          }}
        />
        <StaticDatePicker
          {...requiredCalendarProps}
          {...universalProps}
          {...desktopCalendarProps}
          defaultCalendarMonth={adapter.date(
            dayjs(currentMonth).add(1, "month")
          )}
          componentsProps={{
            leftArrowButton: {
              sx: { display: "none" },
              ref: leftArrowRef,
            },
            rightArrowButton: {
              sx: { display: "none" },
              ref: rightArrowRef,
            },
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
};
