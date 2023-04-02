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
const types_1 = require("../../../types/types");
const createTypeormConnection_1 = require("../../../utils/createTypeormConnection");
const TestClient_1 = require("../../shared/test-utils/TestClient");
const testConstants_1 = require("../../shared/test-utils/testConstants");
const errorMessages_1 = require("../../shared/utils/errorMessages");
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
describe("populate inbox", () => {
    const client = new TestClient_1.TestClient("graphql");
    const message1 = "first message";
    let conversationId;
    test("unauthenticated user attempts to populate conversation", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.populateInbox(types_1.InboxType.Guest);
        expect(response.errors[0].message).toEqual(errorMessages_1.unauthenticatedErrorMessage);
    }));
    test("guest sends message to host and populates inbox", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser2.email, testConstants_1.testUser2.password);
        const conversation = yield client.createConversation(listingId, message1);
        conversationId = conversation.data.createConversation.conversationId;
        const inbox = yield client.populateInbox(types_1.InboxType.Guest);
        expect(inbox.data.populateInbox.length).toEqual(1);
        const { text, interlocutorId } = inbox.data.populateInbox[0];
        expect(text).toEqual(message1);
        expect(interlocutorId).toBeNull();
        const { firstName, lastName, avatar } = testConstants_1.testUser1;
        expect(inbox.data.populateInbox[0].interlocutor).toEqual({
            firstName,
            lastName,
            avatar,
        });
    }));
    const message2 = "another message from different user";
    test("another guest sends message to same host, host receives all messages and populates inbox", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser3.email, testConstants_1.testUser3.password);
        yield client.createConversation(listingId, message2);
        yield client.login(testConstants_1.testUser1.email, testConstants_1.testUser1.password);
        const inbox = yield client.populateInbox(types_1.InboxType.Host);
        expect(inbox.data.populateInbox.length).toEqual(2);
        const { text, interlocutor, interlocutorId } = inbox.data.populateInbox[0];
        expect(text).toEqual(message2);
        expect(interlocutorId).toBeNull();
        const { firstName, lastName, avatar } = testConstants_1.testUser3;
        expect(interlocutor).toEqual({
            firstName,
            lastName,
            avatar,
        });
        const { text: text2, interlocutor: interlocutor2 } = inbox.data.populateInbox[1];
        expect(text2).toEqual(message1);
        expect(interlocutor2).toEqual({
            firstName: testConstants_1.testUser2.firstName,
            lastName: testConstants_1.testUser2.lastName,
            avatar: testConstants_1.testUser2.avatar,
        });
    }));
    const message3 = "response message";
    test("host replies to first guest and populates inbox", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.createMessage(conversationId, message3);
        const inbox = yield client.populateInbox(types_1.InboxType.Host);
        expect(inbox.data.populateInbox.length).toEqual(2);
        expect(inbox.data.populateInbox[0].text).toEqual(message3);
        expect(inbox.data.populateInbox[1].text).toEqual(message2);
    }));
});
//# sourceMappingURL=populate-inbox.test.js.map