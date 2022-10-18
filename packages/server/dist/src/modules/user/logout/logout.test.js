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
const TestClient_1 = require("../../../testUtils/TestClient");
let userId;
const email = "bob@bob.com";
const password = "cjdkvbndsjvk";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createTypeormConnection_1.createTypeormConnection)();
    const user = yield User_1.User.create({
        email,
        password,
        confirmed: true,
    }).save();
    userId = user.id;
}));
describe("logout", () => {
    test("multiple sessions", () => __awaiter(void 0, void 0, void 0, function* () {
        const session1 = new TestClient_1.TestClient("graphql");
        const session2 = new TestClient_1.TestClient("graphql");
        yield session1.login(email, password);
        yield session2.login(email, password);
        expect(yield session1.me()).toEqual(yield session2.me());
        yield session1.logout();
        expect(yield session1.me()).toEqual(yield session2.me());
    }));
    test("test logging out a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient("graphql");
        yield client.login(email, password);
        const response = yield client.me();
        expect(response.data).toEqual({
            me: {
                id: userId,
                email,
            },
        });
        yield client.logout();
        const response2 = yield client.me();
        expect(response2.data.me).toBeNull();
    }));
});
//# sourceMappingURL=logout.test.js.map