import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import { bookingSchema } from "@airbnb-clone/common";
import { useCreateBookingMutation } from "@airbnb-clone/controller";
import { useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Form, Formik } from "formik";

import { SelectDates } from "./components/SelectDates";
import { SelectGuests } from "./components/SelectGuests";
import { formBorderColor } from "../../constants/constants";
import { BookingButton } from "./BookingButton";
import { BookingProps } from "./Booking";
import { getDayDifference } from "../../utils/getDayDifference";
import { Receipt } from "./Receipt";

export const DesktopBooking = ({
  price,
  rating,
  calendarOpen,
  setCalendarOpen,
}: BookingProps) => {
  return (
    <>
      <Box
        width="100%"
        marginBottom={2}
        border="1px solid"
        borderColor={formBorderColor}
        borderRadius={2}
        position="relative"
      >
        <SelectDates
          calendarOpen={calendarOpen}
          setCalendarOpen={setCalendarOpen}
        />
        <SelectGuests />
      </Box>
      {/* {error?.message && (
        <FormHelperText error>{error.message}</FormHelperText>
      )} */}
      <BookingButton setCalendarOpen={setCalendarOpen} fullWidth />
      {/* {data?.createBooking && (
        <FormHelperText
          sx={{
            fontSize: 16,
            color: "success.main",
          }}
        >
          Your booking is complete!
        </FormHelperText>
      )} */}

      <Receipt price={price} />
    </>
  );
};
