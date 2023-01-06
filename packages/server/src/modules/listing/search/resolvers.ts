import { SelectQueryBuilder } from "typeorm";
import dayjs = require("dayjs");

import { Listing } from "../../../entity/Listing";
import { Resolvers, SearchListingsInput } from "../../../types/types";
import { getTypeormConnection } from "../../../utils/getTypeormConnection";
import { Booking } from "../../../entity/Booking";
import { dateFormat } from "@airbnb-clone/common";
import { getLatAndLngFromText } from "./utils/getLatAndLngFromText";

export const resolvers: Resolvers = {
  SearchListingResult: {
    photos: ({ photos }) =>
      photos.map(
        (url) => "https://res.cloudinary.com/stefandevelops/image/upload/" + url
      ),
  },
  Query: {
    searchListings: async (_, { input, limit, offset }) => {
      const { where, guests, beds } = input as SearchListingsInput;
      let { start, end } = input as SearchListingsInput;

      let typeormConnection = getTypeormConnection();
      let queryBuilder = typeormConnection
        .getRepository(Listing)
        .createQueryBuilder("l")
        .andWhere("l.status = :status", { status: "active" })
        .take(limit)
        .skip(offset);

      if (guests) queryBuilder.andWhere("l.guests = :guests", { guests });
      if (beds) queryBuilder.andWhere("l.beds = :beds", { beds });
      if (start || end) {
        // should this logic be on front end so input in search bar gets
        // filled in with the automatically generated value?
        if (!start) {
          start = dayjs(end).subtract(1, "day").format(dateFormat);
        } else if (!end) {
          end = dayjs(start).add(1, "day").format(dateFormat);
        }

        //@ts-ignore
        const notExistsQuery = <T>(builder: SelectQueryBuilder<T>) =>
          `NOT EXISTS (${builder.getQuery()})`;

        queryBuilder.andWhere(
          notExistsQuery(
            typeormConnection
              .getRepository(Booking)
              .createQueryBuilder("b")
              .where('b."listingId" = l.id')
              .andWhere("daterange(:start, :end) && b.range")
          ),
          {
            start,
            end,
          }
        );
      }
      if (where) {
        const { lat, lng } = await getLatAndLngFromText(where);

        queryBuilder
          .setParameters({
            latitude: lat,
            longitude: lng,
          })
          .select("l.*")
          .addSelect(
            // haversine formula to find distance
            `( 6371 * acos( cos( radians(:latitude) ) * cos( radians( l.latitude ) ) * cos( radians( l.longitude ) - radians(:longitude) ) + sin( radians(:latitude) ) * sin(radians(l.latitude)) ) )`,
            "distance"
          )
          .groupBy("id")
          .orderBy("distance", "ASC");

        const results = await queryBuilder.getRawMany();

        return {
          results,
          searchLocation: { lat, lng },
        };
      }

      const listings = await queryBuilder.getMany();

      return { results: listings };
    },
  },
};
