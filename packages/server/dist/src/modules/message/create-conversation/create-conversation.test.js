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
const validate = require("uuid-validate");
const uuid_1 = require("uuid");
const common_1 = require("@airbnb-clone/common");
const Listing_1 = require("../../../entity/Listing");
const User_1 = require("../../../entity/User");
const createTypeormConnection_1 = require("../../../utils/createTypeormConnection");
const TestClient_1 = require("../../shared/test-utils/TestClient");
const testConstants_1 = require("../../shared/test-utils/testConstants");
const errorMessages_1 = require("../../shared/utils/errorMessages");
const errorMessages_2 = require("./utils/errorMessages");
const types_1 = require("../../../types/types");
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
describe("create conversation", () => {
    const client = new TestClient_1.TestClient("graphql");
    test("unauthenticated user attempts to start conversation", () => __awaiter(void 0, void 0, void 0, function* () {
        const { errors } = yield client.createConversation(listingId, "message");
        expect(errors[0].message).toEqual(errorMessages_1.unauthenticatedErrorMessage);
    }));
    test("host attempts to start conversation with own listing", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser1.email, testConstants_1.testUser1.password);
        const { errors } = yield client.createConversation(listingId, "message");
        expect(errors[0].message).toEqual(errorMessages_2.cannotStartConversationWithOwnListing);
    }));
    test("guest attempts to start conversation with bad listing id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser2.email, testConstants_1.testUser2.password);
        const { errors } = yield client.createConversation(listingId + "a", "message");
        expect(errors[0].message).toEqual((0, errorMessages_1.formatBadUuidErrorMessage)("listingId"));
    }));
    test("guest attempts to start conversation with non-existent listing id", () => __awaiter(void 0, void 0, void 0, function* () {
        const badlistingId = (0, uuid_1.v4)();
        const { errors } = yield client.createConversation(badlistingId, "message");
        expect(errors[0].message).toEqual((0, errorMessages_1.formatNotFoundWithGivenIdErrorMessage)("listing", badlistingId));
    }));
    test("guest attempts to start conversation with empty message", () => __awaiter(void 0, void 0, void 0, function* () {
        const { errors } = yield client.createConversation(listingId, "");
        expect(errors[0].message).toEqual(common_1.messageRequired);
    }));
    let conversationId;
    const message1 = "initial message";
    test("guest successfully starts conversation with host", () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield client.createConversation(listingId, message1);
        const { conversationId: conversationIdResponse } = data.createConversation;
        expect(validate(conversationIdResponse)).toEqual(true);
        conversationId = conversationIdResponse;
        const inbox = yield client.populateInbox(types_1.InboxType.Guest);
        expect(inbox.data.populateInbox.length).toEqual(1);
        const { text, fromHost, conversationId: responseConversationId, interlocutor, } = inbox.data.populateInbox[0];
        expect(text).toEqual(message1);
        expect(fromHost).toEqual(false);
        expect(responseConversationId).toEqual(conversationId);
        const { avatar, firstName, lastName } = testConstants_1.testUser1;
        expect(interlocutor).toEqual({
            avatar,
            firstName,
            lastName,
        });
    }));
    test("guest attempts to start another conversation with same listing and is sent appropriate redirect url", () => __awaiter(void 0, void 0, void 0, function* () {
        const messageAttempt = "second attempt";
        const { data } = yield client.createConversation(listingId, messageAttempt);
        expect(data.createConversation.redirect).toEqual(process.env.FRONTEND_HOST +
            `/inbox/${conversationId}?text=${messageAttempt}`);
        const inbox = yield client.populateInbox(types_1.InboxType.Guest);
        expect(inbox.data.populateInbox.length).toEqual(1);
        expect(inbox.data.populateInbox[0].text).toEqual(message1);
    }));
    test("conversation is succesfully initiated with host", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser1.email, testConstants_1.testUser1.password);
        const inbox = yield client.populateInbox(types_1.InboxType.Host);
        const { text, fromHost, conversationId: responseConversationId, } = inbox.data.populateInbox[0];
        expect(text).toEqual(message1);
        expect(fromHost).toEqual(false);
        expect(responseConversationId).toEqual(conversationId);
    }));
});
//# sourceMappingURL=create-conversation.test.js.map