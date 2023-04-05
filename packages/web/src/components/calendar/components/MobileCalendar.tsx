import { useGetListingUnavailabilityLazyQuery } from "@airbnb-clone/controller";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { requiredCalendarProps, universalCalendarProps } from "../utils/utils";
import { OutlinedButton } from "../../OutlinedButton";
import { Box, Stack } from "@mui/material";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "../../Loader";

type Props = {
  start: string | null;
  end: string | null;
  isStartSelection: boolean;
  handleChange: (value: any) => void;
  bookingCalendar?: boolean;
  recallUnavailabiltyQuery?: any;
};

export const MobileCalendar = ({
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

  const [numOfMonthsDisplayed, setNumOfMonthsDisplayed] = useState(
    error ? 1 : 4
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack height={"100%"} position="relative">
        {Array.from(
          Array(error || loading ? 1 : numOfMonthsDisplayed).keys()
        ).map((_, index) => (
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
        {error && <ErrorMessage />}
        <Stack p={2} mt="auto">
          <OutlinedButton
            text="Load more datess"
            handleClick={() =>
              !error && setNumOfMonthsDisplayed(numOfMonthsDisplayed + 4)
            }
            disabled={!!error}
          />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};
