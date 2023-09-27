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
const User_1 = require("../../../entity/User");
const createTypeormConnection_1 = require("../../../utils/createTypeormConnection");
const TestClient_1 = require("../../shared/test-utils/TestClient");
const testConstants_1 = require("../../shared/test-utils/testConstants");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createTypeormConnection_1.createTypeormConnection)();
    yield User_1.User.create(Object.assign(Object.assign({}, testConstants_1.testUser1), { confirmed: true })).save();
}));
describe("me", () => {
    const client = new TestClient_1.TestClient("graphql");
    test("return null if no cookie", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.me();
        expect(response.data.me).toBeNull();
    }));
    test("get current user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, firstName, avatar } = testConstants_1.testUser1;
        yield client.login(email, password);
        const response = yield client.me();
        expect(response.data).toEqual({
            me: {
                firstName,
                avatar,
            },
        });
    }));
});
//# sourceMappingURL=me.test.js.map