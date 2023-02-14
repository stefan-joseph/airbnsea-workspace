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
const constants_1 = require("../../shared/utils/constants");
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
describe("populate conversation", () => {
    const client = new TestClient_1.TestClient("graphql");
    const message1 = "initial message";
    test("guest sends message to host and populates conversation", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser2.email, testConstants_1.testUser2.password);
        const { data: { createMessage }, } = yield client.createMessage(listingId, message1);
        const inbox = yield client.populateConversationWithHost(createMessage);
        const { interlocutorId, interlocutor, listingId: responseListingId, listing, messages, } = inbox.data.populateConversationWithHost;
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
        const { data: { createMessage }, } = yield client.createMessage(listingId, message2);
        const inbox = yield client.populateConversationWithGuest(createMessage);
        const { interlocutorId, interlocutor, listingId: responseListingId, listing, messages, } = inbox.data.populateConversationWithGuest;
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
});
//# sourceMappingURL=populate-conversation.test.js.map