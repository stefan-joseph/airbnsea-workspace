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
exports.resolvers = void 0;
const User_1 = require("../../../entity/User");
const constants_1 = require("../../../utils/constants");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
exports.resolvers = {
    Mutation: {
        loginAsRandomUser: (_, __, { redis, req }) => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield User_1.User.find({ where: {} });
            if (!users) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("A random user could not be found at this time.");
            }
            const randomUser = users[Math.floor(Math.random() * users.length)];
            req.session.userId = randomUser.id;
            if (req.sessionID) {
                yield redis.lpush(`${constants_1.userSessionIdPrefix}${randomUser.id}`, req.sessionID);
            }
            return true;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map