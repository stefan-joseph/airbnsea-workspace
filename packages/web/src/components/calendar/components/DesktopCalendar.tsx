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
import {
  GetListingUnavailabilityQuery,
  useGetListingUnavailabilityLazyQuery,
} from "@airbnb-clone/controller";

import { getNextUnavailableDate } from "../../../utils/getNextUnavailableDate";
import { DateTextField } from "../../../modules/booking/components/DateTextField";
import { formBorderColor } from "../../../constants/constants";
import { RenderDay } from "./RenderDay";
import {
  renderDay,
  requiredCalendarProps,
  universalCalendarProps,
} from "../utils/utils";

type Props = {
  start: string | null;
  end: string | null;
  isStartSelection: boolean;
  // setIsStartSelection: (value: boolean) => void;
  handleChange: (value: any) => void;
  // handleClose?: () => void;
  // handleClear?: () => void;
  recallUnavailabiltyQuery?: any;
  bookingCalendar?: boolean;
};

export const DesktopCalendar = ({
  start,
  end,
  isStartSelection,
  // setIsStartSelection,
  handleChange,
  // handleClose,
  // handleClear,
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
        <StaticDatePicker
          {...requiredCalendarProps}
          {...universalCalendarProps(
            start,
            end,
            !!bookingCalendar,
            dateHovered,
            setDateHovered,
            isStartSelection,
            loading,
            data,
            handleChange
          )}
          {...desktopCalendarProps}
          defaultCalendarMonth={adapter.date(dayjs(currentMonth))}
          componentsProps={{
            leftArrowButton: {
              sx: { position: "absolute", left: 22, top: 14 },
            },
            rightArrowButton: {
              sx: { position: "absolute", right: 22, top: 14 },
            },
          }}
        />
        <StaticDatePicker
          {...requiredCalendarProps}
          {...universalCalendarProps(
            start,
            end,
            !!bookingCalendar,
            dateHovered,
            setDateHovered,
            isStartSelection,
            loading,
            data,
            handleChange
          )}
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
