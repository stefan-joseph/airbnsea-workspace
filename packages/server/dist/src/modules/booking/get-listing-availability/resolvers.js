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
const Booking_1 = require("../../../entity/Booking");
const dayjs = require("dayjs");
const common_1 = require("@airbnb-clone/common");
exports.resolvers = {
    Query: {
        getListingUnavailability: (_, { listingId }) => __awaiter(void 0, void 0, void 0, function* () {
            const bookings = yield Booking_1.Booking.find({ where: { listingId } });
            let unavailableDates = [];
            bookings.map((b) => {
                const dates = b.range.split(/[\[,\s)]/);
                const diff = dayjs(dates[2]).diff(dates[1], "day");
                Array(diff)
                    .fill("")
                    .map((_, i) => {
                    unavailableDates.push(dayjs(dates[1]).add(i, "day").format(common_1.dateFormat));
                });
            });
            return unavailableDates;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map