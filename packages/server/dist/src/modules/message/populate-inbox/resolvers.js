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
const Listing_1 = require("../../../entity/Listing");
const Message_1 = require("../../../entity/Message");
exports.resolvers = {
    Message: {
        user: ({ userId }, _, { userLoader }) => userLoader.load(userId),
        userId: () => null,
    },
    Query: {
        populateInbox: (_, { type }, { req: { session: { userId }, }, }) => __awaiter(void 0, void 0, void 0, function* () {
            if (type === "guest") {
                const messages = Message_1.Message.find({
                    where: { userId },
                });
                console.log(messages);
            }
            else {
                const listings = Listing_1.Listing.find({
                    where: {
                        userId,
                    },
                });
                console.log(listings);
                const messages = Message_1.Message.find({
                    where: { userId },
                });
                console.log(messages);
            }
            return [];
        }),
    },
};
//# sourceMappingURL=resolvers.js.map