import { bookingSchema } from "@airbnb-clone/common";
import { useCreateBookingMutation } from "@airbnb-clone/controller";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Form, Formik } from "formik";

import { DesktopBooking } from "./components/DesktopBooking";
import { MobileBooking } from "./components/MobileBooking";

interface BookingInputValues {
  start: string | null;
  end: string | null;
  guests: number | string;
}

export type BookingProps = {
  price: number;
  rating: number;
  calendarOpen: boolean;
  maxGuests?: number;
  setCalendarOpen: (value: boolean) => void;
};

export const Booking = ({
  mobile,
  price,
  rating,
  maxGuests,
}: {
  mobile?: boolean;
  price: number;
  rating: number;
  maxGuests: number;
}) => {
  const [searchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const guests = searchParams.get("guests");

  const { listingId } = useParams();

  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const [createBookingMutation, { data, error, loading }] =
    useCreateBookingMutation();

  return (
    <Formik
      initialValues={
        {
          start,
          end,
          guests: guests && +guests >= 1 && +guests <= maxGuests ? +guests : 1,
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
        });
      }}
    >
      {() => (
        <Form
          style={{
            width: "100%",
            height: "fit-content",
          }}
        >
          {!mobile ? (
            <DesktopBooking
              price={price}
              rating={rating}
              maxGuests={maxGuests}
              calendarOpen={calendarOpen}
              setCalendarOpen={setCalendarOpen}
            />
          ) : (
            <MobileBooking
              price={price}
              rating={rating}
              calendarOpen={calendarOpen}
              setCalendarOpen={setCalendarOpen}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};
