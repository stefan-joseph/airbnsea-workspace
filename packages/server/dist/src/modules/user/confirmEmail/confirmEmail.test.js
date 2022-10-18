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
const createConfirmEmailLink_1 = require("../../../utils/createConfirmEmailLink");
const createTypeormConnection_1 = require("../../../utils/createTypeormConnection");
const graphql_request_1 = require("graphql-request");
let userId = "";
const redis = new ioredis_1.default();
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createTypeormConnection_1.createTypeormConnection)();
    const user = yield User_1.User.create({
        email: "bob@bob.gmail.com",
        password: "cjdkvbndsjvk",
    }).save();
    userId = user.id;
}));
describe("test createConfirmEmailLink", () => {
    it("makes sure to confirm user and clears key in redis", () => __awaiter(void 0, void 0, void 0, function* () {
        const url = yield (0, createConfirmEmailLink_1.createConfirmEmailLink)(process.env.TEST_HOST, userId, redis);
        const urlChunks = url.split("/");
        const id = urlChunks[urlChunks.length - 1];
        const response = yield (0, graphql_request_1.request)(process.env.TEST_HOST + "graphql", ` mutation {
              confirmEmail(id: "${id}")
          }`);
        expect(response.confirmEmail).toEqual(true);
        const user = yield User_1.User.findOne({ where: { id: userId } });
        expect(user.confirmed).toBeTruthy();
        const value = yield redis.get(id);
        expect(value).toBeNull();
    }));
    it("sends invalid back if bad id sent", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, graphql_request_1.request)(process.env.TEST_HOST + "graphql", ` mutation {
                confirmEmail(id: "${43543}")
            }`);
        expect(response.confirmEmail).toEqual(false);
    }));
});
//# sourceMappingURL=confirmEmail.test.js.map