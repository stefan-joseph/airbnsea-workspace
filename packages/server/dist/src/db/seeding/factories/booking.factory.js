"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingFactory = void 0;
const typeorm_extension_1 = require("typeorm-extension");
const Booking_1 = require("../../../entity/Booking");
exports.BookingFactory = (0, typeorm_extension_1.setSeederFactory)(Booking_1.Booking, (faker) => {
    const booking = new Booking_1.Booking();
    console.log(faker);
    booking.range;
    booking.userId;
    booking.listingId;
    return booking;
});
//# sourceMappingURL=booking.factory.js.map