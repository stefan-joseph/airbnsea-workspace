import { Booking } from "../../../entity/Booking";
import dayjs = require("dayjs");

import { Resolvers } from "../../../types/types";
import { dateFormat } from "@airbnb-clone/common";
// import { listingCacheKey } from "../../../utils/constants";

export const resolvers: Resolvers = {
  Query: {
    getListingUnavailability: async (_, { listingId }) => {
      const bookings = await Booking.find({ where: { listingId } });

      let unavailableDates: string[] = [];

      bookings.map((b) => {
        const dates = b.range.split(/[\[,\s)]/);
        const diff = dayjs(dates[2]).diff(dates[1], "day");

        Array(diff)
          .fill("")
          .map((_, i) => {
            unavailableDates.push(
              dayjs(dates[1]).add(i, "day").format(dateFormat)
            );
          });
      });

      return unavailableDates;
    },
  },
};
