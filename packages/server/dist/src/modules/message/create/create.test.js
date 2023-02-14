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
const common_1 = require("@airbnb-clone/common");
const Listing_1 = require("../../../entity/Listing");
const User_1 = require("../../../entity/User");
const createTypeormConnection_1 = require("../../../utils/createTypeormConnection");
const TestClient_1 = require("../../shared/test-utils/TestClient");
const testConstants_1 = require("../../shared/test-utils/testConstants");
const errorMessages_1 = require("../../shared/utils/errorMessages");
const errorMessages_2 = require("./utils/errorMessages");
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
describe("create message", () => {
    const client = new TestClient_1.TestClient("graphql");
    test("host attempts to send message to own listing/send initial message", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser1.email, testConstants_1.testUser1.password);
        const { errors } = yield client.createMessage(listingId, "message");
        expect(errors[0].message).toEqual(errorMessages_2.cannotMessageOwnListing);
    }));
    test("user attempts to send message to non-existent listing", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser2.email, testConstants_1.testUser2.password);
        const { errors } = yield client.createMessage(listingId + "a", "message");
        expect(errors[0].message).toEqual((0, errorMessages_1.formatBadUuidErrorMessage)("listingId"));
    }));
    test("user attempts to send empty message", () => __awaiter(void 0, void 0, void 0, function* () {
        const { errors } = yield client.createMessage(listingId, "");
        expect(errors[0].message).toEqual(common_1.messageRequired);
    }));
    test("guest successfully sends initial message", () => __awaiter(void 0, void 0, void 0, function* () {
        const message1 = "initial message";
        const { data } = yield client.createMessage(listingId, message1);
        expect(validate(data.createMessage)).toEqual(true);
        const inbox = yield client.populateGuestInbox();
        expect(inbox.data.populateGuestInbox[0].text).toEqual(message1);
    }));
    test("host successfully responds to guest", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.login(testConstants_1.testUser1.email, testConstants_1.testUser1.password);
        const message2 = "response message";
        const { data } = yield client.createMessage(listingId, message2);
        expect(validate(data.createMessage)).toEqual(true);
        const inbox = yield client.populateHostInbox();
        expect(inbox.data.populateHostInbox[0].text).toEqual(message2);
    }));
});
//# sourceMappingURL=create.test.js.map