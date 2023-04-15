import {
  bookingSchema,
  getDayDifference,
  calculateBookingCosts,
} from "@airbnb-clone/common";
import { ValidationError } from "yup";

import { Booking } from "../../../entity/Booking";
import { Resolvers } from "../../../types/types";
import { getTypeormConnection } from "../../../utils/getTypeormConnection";
import { formatYupError } from "../../shared/utils/formatYupError";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { Listing } from "../../../entity/Listing";
import { cannotBookOwnListing, datesUnavailable } from "./utils/errorMessages";
import { formatNotFoundWithGivenIdErrorMessage } from "../../shared/utils/errorMessages";
import { imageUrl } from "../../shared/utils/constants";

export const resolvers: Resolvers = {
  Booking: {
    listing: async ({ listingId }) => {
      const listing = await Listing.findOneBy({ id: listingId });
      if (!listing) return null;
      const { name, photos, rating, vesselType } = listing;
      return { name, img: imageUrl + photos[0], rating, vesselType };
    },
  },
  Mutation: {
    createBooking: async (_, { listingId, input }, { req: { session } }) => {
      const { start, end, guests } = input;

      // yup validation
      try {
        await bookingSchema.validate(input);
      } catch (error) {
        return formatYupError(error as ValidationError);
      }

      const listing = await Listing.findOne({ where: { id: listingId } });

      // no listing with this ID exists
      if (!listing) {
        return formatGraphQLYogaError(
          formatNotFoundWithGivenIdErrorMessage("listing", listingId)
        );
      }

      // user cannot book their own listing listingId !== session.userId
      if (listing?.userId === session.userId) {
        return formatGraphQLYogaError(cannotBookOwnListing);
      }

      // booking does not coincide with another booking on same listing
      const alreadyBooking = await getTypeormConnection()
        .getRepository(Booking)
        .createQueryBuilder("b")
        .where("b.listingId = :listingId", { listingId })
        .andWhere("daterange(:start, :end) && b.range", { start, end })
        .getMany();

      if (alreadyBooking.length > 0) {
        return formatGraphQLYogaError(datesUnavailable);
      }

      const { serviceFee, taxes, total } = calculateBookingCosts(
        listing.price,
        getDayDifference(start, end)
      );

      const booking = await Booking.create({
        range: `[${start}, ${end})`,
        guests,
        pricePerNight: listing.price,
        serviceFee,
        taxes,
        total,
        listingId,
        userId: session.userId,
      }).save();

      if (!booking) {
        return formatGraphQLYogaError(
          "The booking could not be created at this time."
        );
      }

      const extractDates: (range: string) => { start: string; end: string } = (
        range
      ) => {
        const chunks = range.split(/\[|, |\)/);

        return { start: chunks[1], end: chunks[2] };
      };

      const dates = extractDates(booking.range);

      return { ...booking, ...dates };
    },
  },
};
