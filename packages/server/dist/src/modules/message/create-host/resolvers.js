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
const User_1 = require("../../../entity/User");
const errorMessages_1 = require("../../shared/utils/errorMessages");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
exports.resolvers = {
    Mutation: {
        createHostMessage: (_, { interlocutorId, listingId, text }, { req: { session: { userId }, }, pubSub, }) => __awaiter(void 0, void 0, void 0, function* () {
            const listing = yield Listing_1.Listing.findOne({
                where: {
                    id: listingId,
                },
            });
            console.log(listing);
            if (!listing) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)((0, errorMessages_1.formatNoListingErrorMessage)(listingId));
            }
            if (listing.userId !== userId) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("You do not have permission to send messages associated with this listing");
            }
            const user = yield User_1.User.findOne({
                where: { id: interlocutorId },
            });
            console.log(user);
            if (!user) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(`No user with id: ${interlocutorId}`);
            }
            const dbMessage = yield Message_1.Message.create({
                text,
                listingId,
                userId: interlocutorId,
            }).save();
            console.log("dbMessage", dbMessage);
            pubSub.publish("newMessage", {
                newMessage: dbMessage,
            });
            return true;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map