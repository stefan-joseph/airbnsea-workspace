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
const types_1 = require("../../../types/types");
const createTypeormConnection_1 = require("../../../utils/createTypeormConnection");
const TestClient_1 = require("../../shared/test-utils/TestClient");
const common_1 = require("@airbnb-clone/common");
let userId = "";
const email = "bob@bob.com";
const password = "dsjkvd";
const firstName = "Bob";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createTypeormConnection_1.createTypeormConnection)();
    const user = yield User_1.User.create({
        email,
        password,
        firstName,
    }).save();
    userId = user.id;
}));
describe("check email", () => {
    const client = new TestClient_1.TestClient("graphql");
    test("bad email", () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield client.checkEmail("asd@");
        expect(data.checkEmail).toEqual({
            field: "email",
            message: common_1.invalidEmail,
        });
    }));
    test("user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistententUser = "nonexistent@user.com";
        const { data } = yield client.checkEmail(nonExistententUser);
        expect(data.checkEmail).toEqual({
            email: nonExistententUser,
            userExists: false,
        });
    }));
    test("user not confirmed", () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield client.checkEmail(email);
        expect(data.checkEmail).toEqual({
            email,
            userExists: true,
        });
    }));
    test("user should sign in with password", () => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.User.update({ id: userId }, { confirmed: true });
        const { data } = yield client.checkEmail(email);
        expect(data.checkEmail).toEqual({
            email,
            userExists: true,
        });
    }));
    test("user exists with oauth", () => __awaiter(void 0, void 0, void 0, function* () {
        const oauthEmail = "oauth@email.com";
        const authorizationServer = types_1.AuthorizationServer["Github"];
        yield User_1.User.create({
            email: oauthEmail,
            firstName,
            authorizationServer,
            confirmed: true,
        }).save();
        const { data } = yield client.checkEmail(oauthEmail);
        expect(data.checkEmail).toEqual({
            email: oauthEmail,
            authorizationServer,
            firstName,
            avatar: null,
        });
    }));
});
//# sourceMappingURL=checkEmail.test.js.map