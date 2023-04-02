"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Listing_1 = require("../../../entity/Listing");
const getTypeormConnection_1 = require("../../../utils/getTypeormConnection");
const Booking_1 = require("../../../entity/Booking");
const getLatAndLngFromText_1 = require("./utils/getLatAndLngFromText");
exports.resolvers = {
    SearchListingResult: {
        photos: ({ photos }) => photos.map((url) => "https://res.cloudinary.com/stefandevelops/image/upload/" + url),
    },
    Query: {
        searchListings: (_, { input, limit, offset }) => __awaiter(void 0, void 0, void 0, function* () {
            const { where, guests, beds } = input;
            let { start, end } = input;
            let typeormConnection = (0, getTypeormConnection_1.getTypeormConnection)();
            let queryBuilder = typeormConnection
                .getRepository(Listing_1.Listing)
                .createQueryBuilder("l")
                .andWhere("l.status = :status", { status: "active" })
                .take(limit)
                .skip(offset);
            if (guests)
                queryBuilder.andWhere("l.guests = :guests", { guests });
            if (beds)
                queryBuilder.andWhere("l.beds = :beds", { beds });
            if (start && end) {
                const notExistsQuery = (builder) => `NOT EXISTS (${builder.getQuery()})`;
                queryBuilder.andWhere(notExistsQuery(typeormConnection
                    .getRepository(Booking_1.Booking)
                    .createQueryBuilder("b")
                    .where('b."listingId" = l.id')
                    .andWhere("daterange(:start, :end) && b.range")), {
                    start,
                    end,
                });
            }
            if (where) {
                const { lat, lng } = yield (0, getLatAndLngFromText_1.getLatAndLngFromText)(where);
                queryBuilder
                    .setParameters({
                    latitude: lat,
                    longitude: lng,
                })
                    .select("l.*")
                    .addSelect(`( 6371 * acos( cos( radians(:latitude) ) * cos( radians( l.latitude ) ) * cos( radians( l.longitude ) - radians(:longitude) ) + sin( radians(:latitude) ) * sin(radians(l.latitude)) ) )`, "distance")
                    .groupBy("id")
                    .orderBy("distance", "ASC");
                const [results, count] = yield Promise.all([
                    queryBuilder.getRawMany(),
                    queryBuilder.getCount(),
                ]);
                return {
                    results,
                    searchLocation: { lat, lng },
                    count,
                };
            }
            const [results, count] = yield queryBuilder.getManyAndCount();
            return { results, count };
        }),
    },
};
//# sourceMappingURL=resolvers.js.map