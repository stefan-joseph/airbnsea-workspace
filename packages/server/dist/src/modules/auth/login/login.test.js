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
const errorMessages_1 = require("./errorMessages");
const email = "bob@bob.com";
const password = "dsjkvd";
const firstName = "Bob";
const loginExpectError = (client, e, p, errMsg) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.login(e, p);
    expect(response.data.login).toEqual({
        errors: [
            {
                path: "email",
                message: errMsg,
            },
        ],
        sessionId: null,
    });
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createTypeormConnection_1.createTypeormConnection)();
}));
describe("login", () => {
    const client = new TestClient_1.TestClient("graphql");
    test("email not in use", () => __awaiter(void 0, void 0, void 0, function* () {
        yield loginExpectError(client, "john@john.com", password, errorMessages_1.invalidLogin);
    }));
    test("email not confirmed", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.register(email, password, firstName);
        yield loginExpectError(client, email, password, errorMessages_1.confirmEmailError);
    }));
    test("incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.User.update({ email }, { confirmed: true });
        yield loginExpectError(client, email, "fawdajnf", errorMessages_1.invalidLogin);
    }));
    test("login successful", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.login(email, password);
        expect(response.data.login.errors).toBeNull();
        expect(response.data.login.sessionId).toBeTruthy();
    }));
});
//# sourceMappingURL=login.test.js.map