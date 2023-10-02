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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const User_1 = require("../../../entity/User");
const TestClient_1 = require("../../shared/test-utils/TestClient");
const createForgotPasswordLink_1 = require("../../../utils/createForgotPasswordLink");
const createTypeormConnection_1 = require("../../../utils/createTypeormConnection");
const common_1 = require("@airbnb-clone/common");
const errorMessages_1 = require("./errorMessages");
let userId;
const redis = new ioredis_1.default();
const email = "bob@bob.com";
const password = "forgottenPassword";
const newPassword = "newPassword";
const firstName = "Bob";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createTypeormConnection_1.createTypeormConnection)();
    const user = yield User_1.User.create({
        email,
        password,
        firstName,
        confirmed: true,
    }).save();
    userId = user.id;
}));
describe("forgot password", () => {
    const client = new TestClient_1.TestClient("graphql");
    let key;
    test("try changing password to something invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const url = yield (0, createForgotPasswordLink_1.createForgotPasswordLink)("", userId, redis);
        const urlChunks = url.split("/");
        key = urlChunks[urlChunks.length - 1];
        expect(yield client.resetPassword("short", key)).toEqual({
            data: {
                resetPassword: [
                    {
                        path: "newPassword",
                        message: common_1.passwordNotLongEnough,
                    },
                ],
            },
        });
    }));
    test("change password is successful", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.resetPassword(newPassword, key);
        expect(response.data).toEqual({
            resetPassword: null,
        });
    }));
    test("make sure redis key expires after password has been changed", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield client.resetPassword("tryAgain", key)).toEqual({
            data: {
                resetPassword: [
                    {
                        path: "newPassword",
                        message: errorMessages_1.expiredKeyError,
                    },
                ],
            },
        });
    }));
    test("user can log in with new password", () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield client.login(email, newPassword);
        expect(data.login.success).toEqual(true);
    }));
});
//# sourceMappingURL=forgotPassword.test.js.map