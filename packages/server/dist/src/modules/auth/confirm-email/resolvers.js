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
exports.resolvers = {
    Mutation: {
        confirmEmail: (_, args, { redis }) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const userId = yield redis.get(id);
            if (userId) {
                yield User_1.User.update({ id: userId }, { confirmed: true });
                yield redis.del(id);
                return true;
            }
            else {
                return false;
            }
        }),
    },
};
//# sourceMappingURL=resolvers.js.map