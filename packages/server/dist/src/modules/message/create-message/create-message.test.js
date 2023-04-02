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
    yield User_1.User.create(Object.assign(Object.assign({}, testConstants_1.testUser3), { confirmed: true })).save();
    const listing = yield Listing_1.Listing.create(Object.assign(Object.assign({}, testConstants_1.testListing), { userId: userId1 })).save();
    listingId = listing.id;
}));
describe("create message", () => {
    const client = new TestClient_1.TestClient("graphql");
    let conversationId;
    test("unauthenticated user attempts to send message", () => __awaiter(void 0, void 0, void 0, function* () {
        const { errors } = yield client.createMessage(listingId, "message");
        expect(errors[0].message).toEqual(errorMessages_1.unauthenticatedErrorMessage);
    }));
    test("user attempts to send message with bad conversation id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser2.email, testConstants_1.testUser2.password);
        const { data: { createConversation: { conversationId: responseConversationId }, }, } = yield client.createConversation(listingId, "initial message");
        conversationId = responseConversationId;
        const { errors } = yield client.createMessage(conversationId + "a", "message");
        expect(errors[0].message).toEqual((0, errorMessages_1.formatBadUuidErrorMessage)("conversationId"));
    }));
    test("user attempts to send message to non-existent listing", () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentConversationId = (0, uuid_1.v4)();
        const { errors } = yield client.createMessage(nonExistentConversationId, "message");
        expect(errors[0].message).toEqual((0, errorMessages_1.formatNotFoundWithGivenIdErrorMessage)("conversation", nonExistentConversationId));
    }));
    test("guest attempts to send empty message to host", () => __awaiter(void 0, void 0, void 0, function* () {
        const { errors } = yield client.createMessage(conversationId, "");
        expect(errors[0].message).toEqual(common_1.messageRequired);
    }));
    test("guest successfully sends message to host", () => __awaiter(void 0, void 0, void 0, function* () {
        const message = "second message";
        const { data } = yield client.createMessage(conversationId, message);
        expect(validate(data.createMessage)).toEqual(true);
        const inbox = yield client.populateInbox(types_1.InboxType.Guest);
        const { text, fromHost, conversationId: responseConversationId, } = inbox.data.populateInbox[0];
        expect(text).toEqual(message);
        expect(fromHost).toEqual(false);
        expect(responseConversationId).toEqual(conversationId);
    }));
    test("other user attempts to send message to conversation they are not part of", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser3.email, testConstants_1.testUser3.password);
        const { errors } = yield client.createMessage(conversationId, "message");
        expect(errors[0].message).toEqual(errorMessages_2.noPermissionToParticipateInConversationErrorMessage);
    }));
    test("host succesfully responds to guest", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser1.email, testConstants_1.testUser1.password);
        const responseMessage = "response message";
        const { data } = yield client.createMessage(conversationId, responseMessage);
        expect(validate(data.createMessage)).toEqual(true);
        const inbox = yield client.populateInbox(types_1.InboxType.Host);
        const { text, fromHost, conversationId: responseConversationId, } = inbox.data.populateInbox[0];
        expect(text).toEqual(responseMessage);
        expect(fromHost).toEqual(true);
        expect(responseConversationId).toEqual(conversationId);
    }));
});
//# sourceMappingURL=create-message.test.js.map