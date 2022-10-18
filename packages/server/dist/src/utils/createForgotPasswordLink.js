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
exports.createForgotPasswordLink = void 0;
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
const createForgotPasswordLink = (url, userId, redis) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    yield redis.set(`${constants_1.forgotPasswordPrefix}${id}`, userId, "EX", 60 * 20);
    return `${url}/reset-password/${id}`;
});
exports.createForgotPasswordLink = createForgotPasswordLink;
//# sourceMappingURL=createForgotPasswordLink.js.map