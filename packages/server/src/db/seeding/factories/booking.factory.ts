// import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Booking } from "../../../entity/Booking";

export const BookingFactory = setSeederFactory(Booking, () =>
  // faker: Faker
  {
    const booking = new Booking();

    // console.log(faker);

    booking.range;
    booking.guests;
    booking.pricePerNight;
    booking.serviceFee;
    booking.taxes;
    booking.total;
    booking.userId;
    booking.listingId;

    return booking;
  }
);
