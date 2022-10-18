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
const User_1 = require("../entity/User");
const createTypeormConnection_1 = require("./createTypeormConnection");
let userId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createTypeormConnection_1.createTypeormConnection)();
    const user = yield User_1.User.create({
        email: "bobbyboy@bob.com",
        password: "cjdkvbndsjvk",
    }).save();
    userId = user.id;
    console.log(userId);
}));
test("makes sure to confirm user and clears key in redis", () => __awaiter(void 0, void 0, void 0, function* () {
}));
//# sourceMappingURL=createConfirmEmailLink.test.js.map