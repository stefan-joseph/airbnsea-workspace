import { useGetListingUnavailabilityLazyQuery } from "@airbnb-clone/controller";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { requiredCalendarProps, universalCalendarProps } from "../utils/utils";

type Props = {
  numOfMonthsDisplayed: number;
  start: string | null;
  end: string | null;
  isStartSelection: boolean;
  handleChange: (value: any) => void;
  bookingCalendar?: boolean;
  recallUnavailabiltyQuery?: any;
};

export const MobileCalendar = ({
  numOfMonthsDisplayed,
  start,
  end,
  isStartSelection,
  handleChange,
  bookingCalendar,
  recallUnavailabiltyQuery,
}: Props) => {
  const adapter = new AdapterDayjs();

  const [dateHovered, setDateHovered] = useState<string | null>(null);

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {Array.from(Array(numOfMonthsDisplayed).keys()).map((_, index) => (
        <StaticDatePicker
          key={index}
          {...requiredCalendarProps(handleChange)}
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
          defaultCalendarMonth={adapter.date(
            dayjs(new Date()).add(index, "month")
          )}
          componentsProps={{
            leftArrowButton: {
              sx: { display: "none" },
            },
            rightArrowButton: {
              sx: { display: "none" },
            },
          }}
        />
      ))}
    </LocalizationProvider>
  );
};
