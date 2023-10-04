import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { IoClose } from "react-icons/io5";

import { BookingButton } from "./BookingButton";
import { Field, FieldProps } from "formik";
import { BookingProps } from "../Booking";
import { Calendar } from "../../../components/calendar/Calendar";
import { PriceAndRatingStack } from "./PriceAndRatingStack";
import { searchBarBorderColor } from "../../../constants/constants";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { BookingHeader } from "../../../components/calendar/components/BookingHeader";
import Loader from "../../../components/Loader";
import { CompletionOfBooking } from "./CompletionOfBooking";
import { RequestErrorMessage } from "../../../components/RequestErrorMessage";
import { useLoadingDelay } from "../../../components/hooks/useLoadingDelay";

export const MobileBooking = ({
  listingData,
  calendarOpen,
  setCalendarOpen,
  result,
}: BookingProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const [isStartSelection, setIsStartSelection] = useState<boolean>(
    !start || (start && end) ? true : false
  );

  const [openBookingResponse, setOpenBookingResponse] =
    useState<boolean>(false);

  const { data, error, loading } = result;

  const { delay, setDelay } = useLoadingDelay(loading);

  const { price, rating } = listingData;

  return (
    <>
      <Field>
        {/* for start & end */}
        {({ form: { values, setFieldValue, isValid } }: FieldProps) => (
          <>
            <Stack direction="row" justifyContent="space-between" gap={2}>
              <PriceAndRatingStack
                price={price}
                rating={rating}
                start={values.start}
                end={values.end}
                handleClick={() => setCalendarOpen(true)}
              />
              <BookingButton
                handleClick={() => {
                  setOpenBookingResponse(true);
                  setDelay(true);
                }}
                setCalendarOpen={setCalendarOpen}
              />
            </Stack>
            <Drawer
              open={calendarOpen}
              onClose={() => setCalendarOpen(false)}
              anchor="bottom"
              PaperProps={{
                sx: {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
              }}
            >
              <Stack height={"98vh"}>
                <>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    padding={2}
                    paddingTop={1}
                  >
                    <IconButton
                      onClick={() => setCalendarOpen(false)}
                      color="info"
                    >
                      <IoClose />
                    </IconButton>
                    <Button
                      onClick={() => {
                        setFieldValue("start", null);
                        setFieldValue("end", null);
                        searchParams.delete("start");
                        searchParams.delete("end");
                        setSearchParams(searchParams);
                        setIsStartSelection(true);
                      }}
                      size="medium"
                      sx={{ fontSize: 14 }}
                    >
                      Clear dates
                    </Button>
                  </Stack>
                  <BookingHeader
                    mobile
                    start={values.start}
                    end={values.end}
                    isStartSelection={isStartSelection}
                    setIsStartSelection={setIsStartSelection}
                  />
                  <Box overflow="scroll" mb="auto" height="100%">
                    <Calendar
                      mobile
                      bookingCalendar
                      start={values.start}
                      end={values.end}
                      setFieldValue={setFieldValue}
                      isStartSelection={isStartSelection}
                      setIsStartSelection={setIsStartSelection}
                    />
                  </Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    borderTop="1px solid"
                    borderColor={searchBarBorderColor}
                    padding={2}
                  >
                    <PriceAndRatingStack price={price} rating={rating} />
                    <Button
                      onClick={() => setCalendarOpen(false)}
                      disabled={!values.start || !values.end}
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Stack>
                </>
              </Stack>
            </Drawer>
          </>
        )}
      </Field>
      <Drawer
        open={openBookingResponse}
        onClose={() => !loading && setOpenBookingResponse(false)}
        anchor="bottom"
        PaperProps={{
          sx: {
            height: "98vh",
            p: 3,
            justifyContent: "center",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        {loading || delay ? (
          <Stack gap={4}>
            <Loader />
            <Typography
              fontWeight={600}
              fontSize={18}
              color="grey.700"
              textAlign="center"
            >
              Please wait while we place your reservation...
            </Typography>
          </Stack>
        ) : data?.createBooking ? (
          <CompletionOfBooking
            data={data.createBooking}
            handleClose={() => setOpenBookingResponse(false)}
          />
        ) : (
          <Stack gap={4} height="100%">
            <Box>
              <IconButton onClick={() => setOpenBookingResponse(false)}>
                <IoClose />
              </IconButton>
            </Box>
            <RequestErrorMessage
              header={error?.message}
              body="Please refresh the page or try again."
            />
          </Stack>
        )}
      </Drawer>
    </>
  );
};
