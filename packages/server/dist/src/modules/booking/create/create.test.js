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
const common_1 = require("@airbnb-clone/common");
const Listing_1 = require("../../../entity/Listing");
const User_1 = require("../../../entity/User");
const createTypeormConnection_1 = require("../../../utils/createTypeormConnection");
const TestClient_1 = require("../../shared/test-utils/TestClient");
const testConstants_1 = require("../../shared/test-utils/testConstants");
const errorMessages_1 = require("./utils/errorMessages");
const uuid_1 = require("uuid");
const errorMessages_2 = require("../../shared/utils/errorMessages");
let userId1;
let listingId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createTypeormConnection_1.createTypeormConnection)();
    const user1 = yield User_1.User.create(Object.assign(Object.assign({}, testConstants_1.testUser1), { confirmed: true })).save();
    userId1 = user1.id;
    yield User_1.User.create(Object.assign(Object.assign({}, testConstants_1.testUser2), { confirmed: true })).save();
    const listing = yield Listing_1.Listing.create(Object.assign(Object.assign({}, testConstants_1.testListing), { userId: userId1 })).save();
    listingId = listing.id;
}));
describe("create booking", () => {
    const client = new TestClient_1.TestClient("graphql");
    test("user attempts to create booking with incorrect listing id format", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser1.email, testConstants_1.testUser1.password);
        const testListingId = "testListingId";
        const { errors } = yield client.createBooking(testListingId, testConstants_1.testBooking);
        expect(errors[0].message).toEqual("Unexpected error.");
    }));
    test("user attempts to create booking with non-existent id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser1.email, testConstants_1.testUser1.password);
        const testListingId = (0, uuid_1.v4)();
        const { errors } = yield client.createBooking(testListingId, testConstants_1.testBooking);
        console.log(errors);
        expect(errors[0].message).toEqual((0, errorMessages_2.formatNoListingErrorMessage)(testListingId));
    }));
    test("user attempts to create booking on their own listing", () => __awaiter(void 0, void 0, void 0, function* () {
        const { errors } = yield client.createBooking(listingId, testConstants_1.testBooking);
        expect(errors[0].message).toEqual(errorMessages_1.cannotBookOwnListing);
    }));
    test("user attempts to create booking in past", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser2.email, testConstants_1.testUser2.password);
        const { errors } = yield client.createBooking(listingId, testConstants_1.testBookingInPast);
        expect(errors[0].message).toEqual(common_1.invalidDate);
    }));
    test("user successfully creates booking", () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield client.createBooking(listingId, testConstants_1.testBooking);
        expect(typeof data.createBooking).toEqual("string");
    }));
    test("user attempts to create booking overlapping another booking", () => __awaiter(void 0, void 0, void 0, function* () {
        const { errors } = yield client.createBooking(listingId, testConstants_1.testBookingOverlap);
        expect(errors[0].message).toEqual(errorMessages_1.datesUnavailable);
    }));
});
//# sourceMappingURL=create.test.js.map