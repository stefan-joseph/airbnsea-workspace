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
const Listing_1 = require("../../../entity/Listing");
const User_1 = require("../../../entity/User");
const createTypeormConnection_1 = require("../../../utils/createTypeormConnection");
const TestClient_1 = require("../../shared/test-utils/TestClient");
const testConstants_1 = require("../../shared/test-utils/testConstants");
const uuid_1 = require("uuid");
const errorMessages_1 = require("../../shared/utils/errorMessages");
const constants_1 = require("../../shared/utils/constants");
let userId1;
let listingId;
let photos;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createTypeormConnection_1.createTypeormConnection)();
    const user1 = yield User_1.User.create(Object.assign(Object.assign({}, testConstants_1.testUser1), { confirmed: true })).save();
    userId1 = user1.id;
    const listing = yield Listing_1.Listing.create(Object.assign(Object.assign({}, testConstants_1.testListing), { userId: userId1 })).save();
    listingId = listing.id;
    photos = listing.photos;
}));
describe("view listing", () => {
    const client = new TestClient_1.TestClient("graphql");
    test("user attempts to view listing with incorrect id", () => __awaiter(void 0, void 0, void 0, function* () {
        const incorrectListingId = (0, uuid_1.v4)();
        const { errors } = yield client.viewListing(incorrectListingId);
        expect(errors[0].message).toEqual((0, errorMessages_1.formatNoListingErrorMessage)(incorrectListingId));
    }));
    test("user successfully views listing", () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield client.viewListing(listingId);
        console.log("data", data);
        console.log("photos", photos);
        const photosWithFullUrl = photos.map((photo) => constants_1.imageUrl + photo);
        expect(data.viewListing).toEqual(Object.assign(Object.assign({ id: listingId }, testConstants_1.testListing), { photos: photosWithFullUrl, userId: null, owner: {
                firstName: testConstants_1.testUser1.firstName,
                lastName: testConstants_1.testUser1.lastName,
                avatar: testConstants_1.testUser1.avatar,
            } }));
    }));
});
//# sourceMappingURL=view.test.js.map