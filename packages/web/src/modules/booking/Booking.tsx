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

import { SelectDates } from "./SelectDates";
import { SelectGuests } from "./SelectGuests";
import { formBorderColor } from "../../constants/constants";
import { GraphQLError } from "graphql";

interface BookingInputValues {
  start: string | null;
  end: string | null;
  guests: number | string;
}

export const Booking = ({ price }: { price: number }) => {
  const [searchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const guests = searchParams.get("guests");

  const { listingId } = useParams();

  const [createBookingMutation, { data, error, loading }] =
    useCreateBookingMutation();

  console.log("data", data);

  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const getDayDiff = (start: string, end: string) => {
    return dayjs(end).diff(dayjs(start), "day");
  };

  const calculateCosts = (start: string, end: string, price: number) => {
    const subTotal = getDayDiff(start, end) * price;
    const serviceFee = Math.round(subTotal * 0.1);
    const taxes = Math.round(subTotal * 0.15);
    const total = subTotal + serviceFee + taxes;

    return [
      {
        label: `$${price} USD x ${getDayDiff(start, end)} nights`,
        cost: subTotal,
      },
      { label: "Service fee", cost: serviceFee },
      { label: "Taxes", cost: taxes },
      { label: "Total", cost: total },
    ];
  };

  return (
    <>
      <Formik
        initialValues={
          {
            start,
            end,
            guests: guests && +guests >= 1 && +guests <= 16 ? +guests : 1,
          } as BookingInputValues
        }
        validationSchema={bookingSchema}
        onSubmit={async (values) => {
          console.log(values);
          const { start, end, guests } = values;
          if (!start || !end || !guests || !listingId) return;

          await createBookingMutation({
            variables: {
              listingId,
              input: {
                start: start,
                end: end,
                guests: +guests,
              },
            },
          }).catch((error) => console.log(error));
        }}
      >
        {({ isValid, values }) => (
          <Form>
            <Box
              // @TODO doesn't extend full width because of transformation
              width="100%"
              sx={{
                border: "1px solid",
                borderColor: formBorderColor,
                borderRadius: 2,
                position: "relative",
              }}
            >
              <SelectDates
                calendarOpen={calendarOpen}
                setCalendarOpen={setCalendarOpen}
              />
              <SelectGuests />
            </Box>
            {error?.message && (
              <FormHelperText error>{error.message}</FormHelperText>
            )}
            <Button
              variant="contained"
              disabled={loading}
              type={isValid ? "submit" : undefined}
              onClick={() => {
                if (start && end) return;
                console.log(isValid);
                setCalendarOpen(true);
              }}
              fullWidth
              sx={{ fontSize: 16, mt: 2 }}
            >
              {loading ? (
                <CircularProgress size={30} sx={{ color: "#FFF" }} />
              ) : start && end ? (
                "Reserve"
              ) : (
                "Check availability"
              )}
            </Button>
            {data?.createBooking && (
              <FormHelperText
                sx={{
                  fontSize: 16,
                  color: "success.main",
                }}
              >
                Your booking is complete!
              </FormHelperText>
            )}
          </Form>
        )}
      </Formik>
      {start &&
        end &&
        calculateCosts(start, end, price).map(
          ({ label, cost }, index, array) => {
            const isTotal = array.length - 1 === index;
            return (
              <React.Fragment key={index}>
                {isTotal && <Divider />}
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontWeight: isTotal ? 400 : 100 }}>
                    {label}
                  </Typography>
                  <Typography sx={{ fontWeight: isTotal ? 400 : 100 }}>
                    ${cost} USD
                  </Typography>
                </Stack>
              </React.Fragment>
            );
          }
        )}
    </>
  );
};
