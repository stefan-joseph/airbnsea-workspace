"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testBookingOverlap = exports.testBookingInPast = exports.testBooking = exports.testListing = exports.testUser2 = exports.testUser1 = void 0;
const common_1 = require("@airbnb-clone/common");
const dayjs = require("dayjs");
const types_1 = require("../../../types/types");
exports.testUser1 = {
    email: "bob@bob.com",
    password: "cjdkvbndsjvk",
    firstName: "Bob",
    lastName: "Bobby",
    avatar: "http:/ testavatar.com",
};
exports.testUser2 = {
    email: "sarah@sarah.com",
    password: "kdzjvndsjkvbj",
    firstName: "Sarah",
    lastName: "Smith",
    avatar: "http:/ testavatar.com",
};
exports.testListing = {
    vesselType: types_1.VesselType.Sailboat,
    street: "123 test street",
    apt: "123-b",
    city: "test city",
    state: "test state",
    country: "test country",
    zipcode: "12345",
    name: "Lovely boat",
    description: "really lovely boat",
    price: 100,
    rating: 4.89,
    beds: 2,
    guests: 2,
    latitude: 123.45,
    longitude: 123.45,
    amenities: ["wifi"],
    photos: ["photo.com", "photo.com", "photo.com", "photo.com", "photo.com"],
};
exports.testBooking = {
    start: dayjs(new Date()).add(1, "day").format(common_1.dateFormat),
    end: dayjs(new Date()).add(2, "day").format(common_1.dateFormat),
    guests: 1,
};
exports.testBookingInPast = {
    start: dayjs(new Date()).subtract(1, "day").format(common_1.dateFormat),
    end: dayjs(new Date()).add(1, "day").format(common_1.dateFormat),
    guests: 1,
};
exports.testBookingOverlap = {
    start: dayjs(new Date()).add(1, "day").format(common_1.dateFormat),
    end: dayjs(new Date()).add(3, "day").format(common_1.dateFormat),
    guests: 1,
};
//# sourceMappingURL=testConstants.js.map