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
const common_1 = require("@airbnb-clone/common");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createTypeormConnection_1.createTypeormConnection)();
}));
const email = "bob@bob.com";
const password = "dsjkvd";
const firstName = "Bob";
describe("Register user", () => {
    const client = new TestClient_1.TestClient("graphql");
    test("registers a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.register(email, password, firstName);
        expect(response.data.register.success).toEqual(true);
        const users = yield User_1.User.find({ where: { email } });
        expect(users).toHaveLength(1);
        const user = users[0];
        expect(user.email).toEqual(email);
        expect(user.password).not.toEqual(password);
    }));
    test("attempt to sign up with duplicate email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.register(email, password, firstName);
        expect(response.errors[0].message).toEqual(errorMessages_1.duplicateEmail);
        expect(response.data).toBeNull();
    }));
    test("checks for bad email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.register("b", password, firstName);
        expect(response.data).toEqual({
            register: {
                message: common_1.invalidEmail,
                field: "email",
            },
        });
    }));
    test("checks for bad password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.register(email, "asdsd", firstName);
        expect(response.data).toEqual({
            register: {
                message: common_1.passwordNotLongEnough,
                field: "password",
            },
        });
    }));
    test("checks for bad firstName", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.register(email, password, "q");
        expect(response.data).toEqual({
            register: {
                message: common_1.nameNotLongEnough,
                field: "firstName",
            },
        });
    }));
});
//# sourceMappingURL=register.test.js.map