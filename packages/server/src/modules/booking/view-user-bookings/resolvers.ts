import { Booking } from "../../../entity/Booking";

import { Resolvers } from "../../../types/types";
// import { listingCacheKey } from "../../../utils/constants";

export const resolvers: Resolvers = {
  Query: {
    viewUserBookings: async (
      _,
      __,
      {
        req: {
          session: { userId },
        },
      }
    ) => {
      const bookings = await Booking.find({ where: { userId } });
      console.log(bookings);

      // format range to start and end
      return [];
    },
  },
};
