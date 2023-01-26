import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { BookingButton } from "./BookingButton";
import { Field, FieldProps } from "formik";
import { BookingProps } from "./Booking";
import { Calendar } from "../../components/calendar/Calendar";
import { PriceAndRatingStack } from "./PriceAndRatingStack";
import { searchBarBorderColor } from "../../constants/constants";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getDayDifference } from "../../utils/getDayDifference";

export const MobileBooking = ({
  price,
  rating,
  calendarOpen,
  setCalendarOpen,
}: BookingProps) => {
  return (
    <Field>
      {({ form: { values, setFieldValue } }: FieldProps) => (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              p: 2,
              pl: 3,
              pr: 3,
            }}
          >
            <PriceAndRatingStack
              price={price}
              rating={rating}
              start={values.start}
              end={values.end}
              handleClick={() => setCalendarOpen(true)}
            />
            <BookingButton setCalendarOpen={setCalendarOpen} />
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
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                  <Button
                    onClick={() => {
                      setFieldValue("start", null);
                      setFieldValue("end", null);
                    }}
                    size="medium"
                    sx={{ fontSize: 14 }}
                  >
                    Clear dates
                  </Button>
                </Stack>
                <Typography fontSize={22} fontWeight={600} pl={3.4}>
                  {!values.start
                    ? "Select check-in date"
                    : !values.end
                    ? "Select checkout date"
                    : `${getDayDifference(values.start, values.end)} night${
                        getDayDifference(values.start, values.end) !== 1
                          ? "s"
                          : ""
                      }`}
                </Typography>
                <Box overflow="scroll">
                  <Calendar
                    mobile
                    bookingCalendar
                    start={values.start}
                    end={values.end}
                    setFieldValue={setFieldValue}
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
  );
};
