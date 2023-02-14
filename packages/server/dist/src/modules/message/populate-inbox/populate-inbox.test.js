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
const Listing_1 = require("../../../entity/Listing");
const User_1 = require("../../../entity/User");
const createTypeormConnection_1 = require("../../../utils/createTypeormConnection");
const TestClient_1 = require("../../shared/test-utils/TestClient");
const testConstants_1 = require("../../shared/test-utils/testConstants");
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
describe("populate inbox", () => {
    const client = new TestClient_1.TestClient("graphql");
    const message1 = "first message";
    test("guest sends message to host and populates inbox", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser2.email, testConstants_1.testUser2.password);
        yield client.createMessage(listingId, message1);
        const inbox = yield client.populateGuestInbox();
        expect(inbox.data.populateGuestInbox.length).toEqual(1);
        const { text, userIdOfHost, conversationId } = inbox.data.populateGuestInbox[0];
        expect(text).toEqual(message1);
        expect(userIdOfHost).toBeNull();
        expect(validate(conversationId)).toEqual(true);
        const { firstName, lastName, avatar } = testConstants_1.testUser1;
        expect(inbox.data.populateGuestInbox[0].interlocutor).toEqual({
            firstName,
            lastName,
            avatar,
        });
    }));
    test("host receives guest's message and populates inbox", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser1.email, testConstants_1.testUser1.password);
        const inbox = yield client.populateHostInbox();
        expect(inbox.data.populateHostInbox.length).toEqual(1);
        const { text, interlocutor, userIdOfGuest } = inbox.data.populateHostInbox[0];
        expect(text).toEqual(message1);
        expect(userIdOfGuest).toBeNull();
        const { firstName, lastName, avatar } = testConstants_1.testUser2;
        expect(interlocutor).toEqual({
            firstName,
            lastName,
            avatar,
        });
    }));
    const message2 = "second message";
    test("host replies to guest and populates inbox", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.createMessage(listingId, message2);
        const inbox = yield client.populateHostInbox();
        expect(inbox.data.populateHostInbox[0].text).toEqual(message2);
    }));
    test("guest receives host's message and populates inbox", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser2.email, testConstants_1.testUser2.password);
        const inbox = yield client.populateGuestInbox();
        expect(inbox.data.populateGuestInbox[0].text).toEqual(message2);
    }));
});
//# sourceMappingURL=populate-inbox.test.js.map