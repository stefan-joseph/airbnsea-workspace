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
const common_1 = require("@airbnb-clone/common");
const Booking_1 = require("../../../entity/Booking");
const getTypeormConnection_1 = require("../../../utils/getTypeormConnection");
const formatYupError_1 = require("../../shared/utils/formatYupError");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const Listing_1 = require("../../../entity/Listing");
const errorMessages_1 = require("./utils/errorMessages");
const errorMessages_2 = require("../../shared/utils/errorMessages");
const constants_1 = require("../../shared/utils/constants");
exports.resolvers = {
    Booking: {
        listing: ({ listingId }) => __awaiter(void 0, void 0, void 0, function* () {
            const listing = yield Listing_1.Listing.findOneBy({ id: listingId });
            if (!listing)
                return null;
            const { name, photos, rating, vesselType } = listing;
            return { name, img: constants_1.imageUrl + photos[0], rating, vesselType };
        }),
    },
    Mutation: {
        createBooking: (_, { listingId, input }, { req: { session } }) => __awaiter(void 0, void 0, void 0, function* () {
            const { start, end, guests } = input;
            try {
                yield common_1.bookingSchema.validate(input);
            }
            catch (error) {
                return (0, formatYupError_1.formatYupGraphQLError)(error);
            }
            const listing = yield Listing_1.Listing.findOne({ where: { id: listingId } });
            if (!listing) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)((0, errorMessages_2.formatNotFoundWithGivenIdErrorMessage)("listing", listingId));
            }
            if ((listing === null || listing === void 0 ? void 0 : listing.userId) === session.userId) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.cannotBookOwnListing);
            }
            const alreadyBooking = yield (0, getTypeormConnection_1.getTypeormConnection)()
                .getRepository(Booking_1.Booking)
                .createQueryBuilder("b")
                .where("b.listingId = :listingId", { listingId })
                .andWhere("daterange(:start, :end) && b.range", { start, end })
                .getMany();
            if (alreadyBooking.length > 0) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.datesUnavailable);
            }
            const { serviceFee, taxes, total } = (0, common_1.calculateBookingCosts)(listing.price, (0, common_1.getDayDifference)(start, end));
            const booking = yield Booking_1.Booking.create({
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
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("The booking could not be created at this time.");
            }
            const extractDates = (range) => {
                const chunks = range.split(/\[|, |\)/);
                return { start: chunks[1], end: chunks[2] };
            };
            const dates = extractDates(booking.range);
            return Object.assign(Object.assign({}, booking), dates);
        }),
    },
};
//# sourceMappingURL=resolvers.js.map