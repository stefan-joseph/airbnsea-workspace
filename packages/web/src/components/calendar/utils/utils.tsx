import { dateFormat } from "@airbnb-clone/common";
import { GetListingUnavailabilityQuery } from "@airbnb-clone/controller";
import {
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import { PickersDayProps, StaticDatePickerProps } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { grey } from "@mui/material/colors";

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
  const isStartDate = dayjs(day).format(dateFormat) === start;

  const isEndDate = dayjs(day).format(dateFormat) === end;

  const endOrDateHovered = end || dateHovered;

  const conditionalEdgeCases =
    (!dayjs(day).add(1, "day").isAfter(day, "month") &&
      !DayComponentProps.outsideCurrentMonth) ||
    (dayjs(day).add(1, "day").isAfter(day, "month") &&
      !DayComponentProps.outsideCurrentMonth) ||
    (DayComponentProps.outsideCurrentMonth &&
      dayjs(day).subtract(1, "day").isBefore(day, "month"));

  const isGrey =
    (dayjs(day).isAfter(start) || dayjs(day).isSame(start)) &&
    (dayjs(day).isBefore(endOrDateHovered) ||
      (dayjs(day).isSame(endOrDateHovered) && conditionalEdgeCases));

  const isFadeToGrey =
    DayComponentProps.outsideCurrentMonth &&
    dayjs(day).add(1, "day").isAfter(day, "month");

  const isFadeFromGrey =
    DayComponentProps.outsideCurrentMonth &&
    dayjs(day).subtract(1, "day").isBefore(day, "month");

  if (!bookingCalendar) {
    const isUnavailable = Boolean(dayjs(day).isBefore(new Date(), "day"));

    return (
      <RenderDay
        key={dayjs(day).format(dateFormat)}
        DayComponentProps={DayComponentProps}
        start={start}
        end={end}
        formattedDay={dayjs(day).format(dateFormat)}
        isStartDate={isStartDate}
        isEndDate={isEndDate}
        isGrey={isGrey}
        isUnavailable={isUnavailable}
        setDateHovered={setDateHovered}
        dateHovered={dateHovered}
        isStartSelection={isStartSelection}
        isFadeToGrey={isFadeToGrey}
        isFadeFromGrey={isFadeFromGrey}
      />
    );
  }

  if (loading) {
    // don't show dates while loading
    // loading spinner will be present
    return <div key={dayjs(day).format(dateFormat)}></div>;
  }

  if (data?.getListingUnavailability) {
    const { getListingUnavailability: unavailableDates } = data;

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
        isGrey={isGrey}
        isUnavailable={isUnavailable}
        isCheckoutOnly={isCheckoutOnly}
        setDateHovered={setDateHovered}
        dateHovered={dateHovered}
        isStartSelection={isStartSelection}
        isFadeToGrey={isFadeToGrey}
        isFadeFromGrey={isFadeFromGrey}
      />
    );

    if (isCheckoutOnly) {
      const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
          "&:before": {
            border: "1px solid #E6E8ED",
            color: theme.palette.common.white,
          },
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          color: grey["800"],
          boxShadow: theme.shadows[8],
          fontSize: 14,
          border: "1px solid #E6E8ED",
          padding: 8,
        },
      }));

      return (
        <LightTooltip
          title="Checkout only"
          arrow
          placement="top-start"
          enterDelay={500}
          leaveDelay={200}
          // disable tooltip when user is selecting checkout date
          // disableHoverListener={!isStartSelection}
        >
          <span>{RenderDayComponent}</span>
        </LightTooltip>
      );
    }

    return RenderDayComponent;
  }
  // if availability of listing is not received
  // error message will show
  return <div key={dayjs(day).format(dateFormat)}></div>;
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
