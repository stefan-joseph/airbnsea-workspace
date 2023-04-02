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
const uuid_1 = require("uuid");
const Listing_1 = require("../../../entity/Listing");
const User_1 = require("../../../entity/User");
const createTypeormConnection_1 = require("../../../utils/createTypeormConnection");
const TestClient_1 = require("../../shared/test-utils/TestClient");
const testConstants_1 = require("../../shared/test-utils/testConstants");
const constants_1 = require("../../shared/utils/constants");
const errorMessages_1 = require("../../shared/utils/errorMessages");
const errorMessages_2 = require("./utils/errorMessages");
let userId1;
let listingId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createTypeormConnection_1.createTypeormConnection)();
    const user1 = yield User_1.User.create(Object.assign(Object.assign({}, testConstants_1.testUser1), { confirmed: true })).save();
    userId1 = user1.id;
    yield User_1.User.create(Object.assign(Object.assign({}, testConstants_1.testUser2), { confirmed: true })).save();
    yield User_1.User.create(Object.assign(Object.assign({}, testConstants_1.testUser3), { confirmed: true })).save();
    const listing = yield Listing_1.Listing.create(Object.assign(Object.assign({}, testConstants_1.testListing), { userId: userId1 })).save();
    listingId = listing.id;
}));
describe("populate conversation", () => {
    const client = new TestClient_1.TestClient("graphql");
    const message1 = "initial message";
    let conversationId;
    test("unauthenticated user attempts to populate conversation", () => __awaiter(void 0, void 0, void 0, function* () {
        const populateGuest = yield client.populateConversation((0, uuid_1.v4)());
        expect(populateGuest.errors[0].message).toEqual(errorMessages_1.unauthenticatedErrorMessage);
    }));
    test("guest attempts to populate conversation with non-existent conversation id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser2.email, testConstants_1.testUser2.password);
        const nonExistentId = (0, uuid_1.v4)();
        const populateGuest = yield client.populateConversation(nonExistentId);
        expect(populateGuest.errors[0].message).toEqual((0, errorMessages_1.formatNotFoundWithGivenIdErrorMessage)("conversation", nonExistentId));
    }));
    test("guest attempts to populate conversation with bad conversation id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser2.email, testConstants_1.testUser2.password);
        const populateGuest = yield client.populateConversation(conversationId + "a");
        expect(populateGuest.errors[0].message).toEqual((0, errorMessages_1.formatBadUuidErrorMessage)("conversation"));
    }));
    test("guest starts conversation with host and populates conversation", () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield client.createConversation(listingId, message1);
        conversationId = data.createConversation.conversationId;
        const inbox = yield client.populateConversation(conversationId);
        const { interlocutorId, interlocutor, listingId: responseListingId, listing, messages, } = inbox.data.populateConversation;
        expect(interlocutorId).toBeNull();
        expect(responseListingId).toEqual(listingId);
        expect(messages.length).toEqual(1);
        expect(messages[0].text).toEqual(message1);
        expect(messages[0].fromHost).toEqual(false);
        const { firstName, lastName, avatar } = testConstants_1.testUser1;
        expect(interlocutor).toEqual({ firstName, lastName, avatar });
        const { name, photos } = testConstants_1.testListing;
        expect(listing).toEqual({ name, img: constants_1.imageUrl + photos[0] });
    }));
    const message2 = "response message";
    test("host receives guest's message, responds and populates conversation", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser1.email, testConstants_1.testUser1.password);
        yield client.createMessage(conversationId, message2);
        const inbox = yield client.populateConversation(conversationId);
        const { interlocutorId, interlocutor, listingId: responseListingId, listing, messages, } = inbox.data.populateConversation;
        expect(interlocutorId).toBeNull();
        expect(responseListingId).toEqual(listingId);
        expect(messages.length).toEqual(2);
        expect(messages[0].text).toEqual(message1);
        expect(messages[0].fromHost).toEqual(false);
        expect(messages[1].text).toEqual(message2);
        expect(messages[1].fromHost).toEqual(true);
        const { firstName, lastName, avatar } = testConstants_1.testUser2;
        expect(interlocutor).toEqual({ firstName, lastName, avatar });
        const { name, photos } = testConstants_1.testListing;
        expect(listing).toEqual({ name, img: constants_1.imageUrl + photos[0] });
    }));
    test("other user attempts to populate conversation that they are not part of", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser3.email, testConstants_1.testUser3.password);
        const { errors } = yield client.populateConversation(conversationId);
        expect(errors[0].message).toEqual(errorMessages_2.noPermissionToViewConversationErrorMessage);
    }));
});
//# sourceMappingURL=populate-conversation.test.js.map