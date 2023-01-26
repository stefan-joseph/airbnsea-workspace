import { dateFormat } from "@airbnb-clone/common";
import { GetListingUnavailabilityQuery } from "@airbnb-clone/controller";
import { Box, Skeleton, TextField, Tooltip } from "@mui/material";
import {
  PickersDay,
  PickersDayProps,
  StaticDatePickerProps,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";

import { getNextUnavailableDate } from "../../../utils/getNextUnavailableDate";
import { RenderDay } from "../components/RenderDay";

type Props = {
  day: any;
  DayComponentProps: PickersDayProps<any>;
  start: string | null;
  end: string | null;
  bookingCalendar?: boolean;
  dateHovered: string | null;
  setDateHovered: React.Dispatch<React.SetStateAction<string | null>>;
  isStartSelection: boolean;
  loading: boolean;
  data: GetListingUnavailabilityQuery | undefined;
};

export const renderDay: (props: Props) => JSX.Element = ({
  day,
  DayComponentProps,
  start,
  end,
  bookingCalendar,
  dateHovered,
  setDateHovered,
  isStartSelection,
  loading,
  data,
}: Props) => {
  if (!bookingCalendar) {
    const isStartDate = dayjs(day).format(dateFormat) === start;

    const isEndDate = dayjs(day).format(dateFormat) === end;

    const isBetween = dayjs(day).isAfter(start) && dayjs(day).isBefore(end);

    const isBetweenHover =
      (dayjs(day).isBefore(dateHovered) || dayjs(day).isSame(dateHovered)) &&
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

  if (loading) {
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
  }

  if (data?.getListingUnavailability) {
    const { getListingUnavailability: unavailableDates } = data;

    const isStartDate = dayjs(day).format(dateFormat) === start;

    const isEndDate = dayjs(day).format(dateFormat) === end;

    const isBetween = dayjs(day).isAfter(start) && dayjs(day).isBefore(end);

    const isBetweenHover =
      (dayjs(day).isBefore(dateHovered) || dayjs(day).isSame(dateHovered)) &&
      dayjs(day).isAfter(start);

    const isUnavailable = Boolean(
      unavailableDates.includes(dayjs(day).format(dateFormat)) ||
        dayjs(day).isBefore(new Date(), "day") ||
        (dayjs(day).isBefore(start) && !isStartSelection) ||
        (start &&
          dayjs(day).isAfter(getNextUnavailableDate(start, unavailableDates)) &&
          !isStartSelection)
    );

    const isCheckoutOnly =
      !isUnavailable &&
      unavailableDates.includes(dayjs(day).add(1, "day").format(dateFormat));

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
  return <div key={dayjs(day).format(dateFormat)}>Q</div>;
};

export const requiredCalendarProps: (
  handleChange: (value: any) => void
) => StaticDatePickerProps<any, any> = (handleChange) => {
  return {
    value: null,
    onChange: handleChange,
    renderInput: (params) => <TextField {...params} />,
  };
};

export const universalCalendarProps: (
  start: string | null,
  end: string | null,
  bookingCalendar: boolean,
  dateHovered: string | null,
  setDateHovered: React.Dispatch<React.SetStateAction<string | null>>,
  isStartSelection: boolean,
  loading: boolean,
  data: GetListingUnavailabilityQuery | undefined,
  handleChange: (value: any) => void
) => StaticDatePickerProps<any, any> = (
  start,
  end,
  bookingCalendar,
  dateHovered,
  setDateHovered,
  isStartSelection,
  loading,
  data,
  handleChange
) => {
  return {
    ...requiredCalendarProps(handleChange),
    views: ["day"],
    openTo: "day",
    disablePast: true,
    displayStaticWrapperAs: "desktop",
    disableHighlightToday: true,
    renderDay: (day, _value, DayComponentProps) => {
      return renderDay({
        day,
        DayComponentProps,
        start,
        end,
        bookingCalendar,
        dateHovered,
        setDateHovered,
        isStartSelection,
        loading,
        data,
      });
    },
  };
};
