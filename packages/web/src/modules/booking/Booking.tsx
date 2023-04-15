import { bookingSchema } from "@airbnb-clone/common";
import {
  CreateBookingMutation,
  useCreateBookingMutation,
  ViewListingQuery,
} from "@airbnb-clone/controller";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Form, Formik } from "formik";

import { DesktopBooking } from "./components/DesktopBooking";
import { MobileBooking } from "./components/MobileBooking";
import { MutationResult } from "@apollo/client";

interface BookingInputValues {
  start: string | null;
  end: string | null;
  guests: number;
}

export type BookingProps = {
  listingData: ViewListingQuery["viewListing"];
  calendarOpen: boolean;
  setCalendarOpen: (value: boolean) => void;
  result: MutationResult<CreateBookingMutation>;
};

export const Booking = ({
  listingData,
  mobile,
}: {
  listingData: ViewListingQuery["viewListing"];
  mobile?: boolean;
}) => {
  const [searchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const guests = searchParams.get("guests");

  const { listingId } = useParams();

  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const [createBookingMutation, result] = useCreateBookingMutation();

  const { guests: maxGuests } = listingData;

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
      validateOnMount
      validateOnChange
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
              listingData={listingData}
              calendarOpen={calendarOpen}
              setCalendarOpen={setCalendarOpen}
              result={result}
            />
          ) : (
            <MobileBooking
              listingData={listingData}
              calendarOpen={calendarOpen}
              setCalendarOpen={setCalendarOpen}
              result={result}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};
