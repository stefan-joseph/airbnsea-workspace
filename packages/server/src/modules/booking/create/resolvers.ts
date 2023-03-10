import { bookingSchema } from "@airbnb-clone/common";
import { ValidationError } from "yup";

import { Booking } from "../../../entity/Booking";
import { Resolvers } from "../../../types/types";

import { getTypeormConnection } from "../../../utils/getTypeormConnection";
import { formatYupError } from "../../shared/utils/formatYupError";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { Listing } from "../../../entity/Listing";
import { cannotBookOwnListing, datesUnavailable } from "./utils/errorMessages";
import { formatNoListingErrorMessage } from "../../shared/utils/errorMessages";

export const resolvers: Resolvers = {
  Mutation: {
    createBooking: async (_, { listingId, input }, { req: { session } }) => {
      const { start, end } = input;

      // yup validation
      try {
        await bookingSchema.validate(input);
      } catch (error) {
        return formatYupError(error as ValidationError);
      }

      const listing = await Listing.findOne({ where: { id: listingId } });

      // no listing with this ID exists
      if (!listing) {
        return formatGraphQLYogaError(formatNoListingErrorMessage(listingId));
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

      const booking = await Booking.create({
        range: `[${start}, ${end})`,
        listingId,
        userId: session.userId,
      }).save();
      console.log(booking);
      if (!booking) {
        return formatGraphQLYogaError(
          "The booking could not be created at this time. Please try again."
        );
      }

      return booking.id;
    },
  },
};
