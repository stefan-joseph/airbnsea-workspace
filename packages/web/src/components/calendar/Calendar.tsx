import {
  Box,
  Button,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  LocalizationProvider,
  PickersDay,
  StaticDatePicker,
  StaticDatePickerProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { dateFormat } from "@airbnb-clone/common";
import { useGetListingUnavailabilityLazyQuery } from "@airbnb-clone/controller";

import { getNextUnavailableDate } from "../../utils/getNextUnavailableDate";
import { DateTextField } from "../../modules/booking/DateTextField";
import { formBorderColor } from "../../constants/constants";
import { RenderDay } from "./RenderDay";

type Props = {
  start: string | null;
  end: string | null;
  isStartSelection: boolean;
  setIsStartSelection: (value: boolean) => void;
  handleChange: (value: any) => void;
  handleClose?: () => void;
  handleClear?: () => void;
  recallUnavailabiltyQuery?: any;
  bookingCalendar?: boolean;
};

export const Calendar = ({
  start,
  end,
  isStartSelection,
  setIsStartSelection,
  handleChange,
  handleClose,
  handleClear,
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

  const primaryCalendarProps: StaticDatePickerProps<any, any> = {
    views: ["day"],
    openTo: "day",
    disablePast: true,
    displayStaticWrapperAs: "desktop",
    disableHighlightToday: true,
    value: null,
    onChange: handleChange,
    renderInput: (params) => <TextField {...params} />,
    onMonthChange: (month) => {
      if (dayjs(month).isAfter(currentMonth) && rightArrowRef.current) {
        rightArrowRef.current.click();
      } else if (leftArrowRef.current) {
        leftArrowRef && leftArrowRef.current.click();
      }
      setCurrentMonth(dayjs(month));
    },
    renderDay: (day, _value, DayComponentProps) => {
      if (!bookingCalendar) {
        const isStartDate = dayjs(day).format(dateFormat) === start;

        const isEndDate = dayjs(day).format(dateFormat) === end;

        const isBetween = dayjs(day).isAfter(start) && dayjs(day).isBefore(end);

        const isBetweenHover =
          (dayjs(day).isBefore(dateHovered) ||
            dayjs(day).isSame(dateHovered)) &&
          dayjs(day).isAfter(start);

        const isUnavailable = Boolean(dayjs(day).isBefore(new Date(), "day"));

        const isCheckoutOnly = false;

        return (
          <RenderDay
            key={dayjs(day).format(dateFormat)}
            DayComponentProps={DayComponentProps}
            start={start}
            end={end}
            formattedDay={dayjs(day).format(dateFormat)}
            isStartDate={isStartDate}
            isEndDate={isEndDate}
            isBetween={isBetween}
            isBetweenHover={isBetweenHover}
            isUnavailable={isUnavailable}
            isCheckoutOnly={isCheckoutOnly}
            setDateHovered={setDateHovered}
            dateHovered={dateHovered}
            isStartSelection={isStartSelection}
          />
        );
      }

      if (loading)
        return (
          <Box
            key={dayjs(day).format(dateFormat)}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Skeleton variant="circular" width={"88%"} height={"94%"}>
              <PickersDay {...DayComponentProps} disableMargin={false} />
            </Skeleton>
          </Box>
        );

      if (data?.getListingUnavailability) {
        const { getListingUnavailability: unavailableDates } = data;

        const isStartDate = dayjs(day).format(dateFormat) === start;

        const isEndDate = dayjs(day).format(dateFormat) === end;

        const isBetween = dayjs(day).isAfter(start) && dayjs(day).isBefore(end);

        const isBetweenHover =
          (dayjs(day).isBefore(dateHovered) ||
            dayjs(day).isSame(dateHovered)) &&
          dayjs(day).isAfter(start);

        const isUnavailable = Boolean(
          unavailableDates.includes(dayjs(day).format(dateFormat)) ||
            dayjs(day).isBefore(new Date(), "day") ||
            (dayjs(day).isBefore(start) && !isStartSelection) ||
            (start &&
              dayjs(day).isAfter(
                getNextUnavailableDate(start, unavailableDates)
              ) &&
              !isStartSelection)
        );

        const isCheckoutOnly =
          !isUnavailable &&
          unavailableDates.includes(
            dayjs(day).add(1, "day").format(dateFormat)
          );

        const RenderDayComponent = (
          <RenderDay
            key={dayjs(day).format(dateFormat)}
            DayComponentProps={DayComponentProps}
            start={start}
            end={end}
            formattedDay={dayjs(day).format(dateFormat)}
            isStartDate={isStartDate}
            isEndDate={isEndDate}
            isBetween={isBetween}
            isBetweenHover={isBetweenHover}
            isUnavailable={isUnavailable}
            isCheckoutOnly={isCheckoutOnly}
            setDateHovered={setDateHovered}
            dateHovered={dateHovered}
            isStartSelection={isStartSelection}
          />
        );

        if (isCheckoutOnly) {
          console.log(dayjs(day).format(dateFormat));
          return (
            <Tooltip
              title="Checkout only"
              arrow
              placement="top-start"
              enterDelay={500}
              leaveDelay={200}
            >
              <span>{RenderDayComponent}</span>
            </Tooltip>
          );
        }

        return RenderDayComponent;
      }
      return <div key={dayjs(day).format(dateFormat)}></div>;
    },
  };

  return (
    <Box p={2}>
      {bookingCalendar && (
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography fontSize={22}>Select dates</Typography>
            <Typography fontSize={14} color={"grey.500"}>
              {"Add your travel dates for exact pricing"}
            </Typography>
          </Stack>
          <Box
            border="1px solid"
            borderColor={formBorderColor}
            borderRadius={2}
            display={"flex"}
            width={300}
            sx={{ backgroundColor: !start ? "grey.100" : "unset" }}
          >
            <Box
              component="button"
              type="button"
              onClick={() => setIsStartSelection(true)}
              borderRadius={2}
              border={
                isStartSelection ? "2px solid black" : "2px solid rgb(0,0,0,0)"
              }
              m={"-1px"}
              sx={{ backgroundColor: isStartSelection ? "#FFF" : "unset" }}
            >
              <DateTextField value={start} />
            </Box>
            <Box
              component="button"
              type="button"
              onClick={() => setIsStartSelection(false)}
              disabled={!start}
              borderRadius={2}
              border={
                !isStartSelection ? "2px solid black" : "2px solid rgb(0,0,0,0)"
              }
              m={"-1px"}
              sx={{
                backgroundColor: "unset",
              }}
            >
              <DateTextField value={end} disabled={!start} />
            </Box>
          </Box>
        </Stack>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row">
          <StaticDatePicker
            {...primaryCalendarProps}
            defaultCalendarMonth={adapter.date(dayjs(currentMonth))}
            componentsProps={{
              leftArrowButton: {
                sx: { position: "absolute", left: 0, top: 100 },
              },
              rightArrowButton: {
                sx: { position: "absolute", right: 0, top: 100 },
              },
            }}
          />
          <StaticDatePicker
            {...primaryCalendarProps}
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
      {bookingCalendar && (
        <Stack direction="row" justifyContent="end" gap={1} sx={{ mt: -4 }}>
          <Button onClick={handleClear}>Clear dates</Button>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Stack>
      )}
    </Box>
  );
};
