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
const Message_1 = require("../../../entity/Message");
exports.resolvers = {
    Message: {
        user: ({ userId }, _, { userLoader }) => userLoader.load(userId),
        userId: () => null,
    },
    Query: {
        messages: (_, { listingId }, { req: { session } }) => __awaiter(void 0, void 0, void 0, function* () {
            return Message_1.Message.find({
                where: { listingId, userId: session.userId },
            });
        }),
    },
};
//# sourceMappingURL=resolvers.js.map