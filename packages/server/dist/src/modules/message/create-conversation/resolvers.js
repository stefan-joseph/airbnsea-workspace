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
const common_1 = require("@airbnb-clone/common");
const uuid_1 = require("uuid");
const Listing_1 = require("../../../entity/Listing");
const Message_1 = require("../../../entity/Message");
const errorMessages_1 = require("../../shared/utils/errorMessages");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const formatYupError_1 = require("../../shared/utils/formatYupError");
const errorMessages_2 = require("./utils/errorMessages");
exports.resolvers = {
    Mutation: {
        createConversation: (_, args, { req: { session: { userId }, }, pubSub, }) => __awaiter(void 0, void 0, void 0, function* () {
            const { listingId, text } = args;
            const listing = yield Listing_1.Listing.findOne({ where: { id: listingId } });
            if (!listing) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)((0, errorMessages_1.formatNotFoundWithGivenIdErrorMessage)("listing", listingId));
            }
            if (listing.userId === userId) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_2.cannotStartConversationWithOwnListing);
            }
            try {
                yield common_1.messageSchema.validate(args);
            }
            catch (error) {
                return (0, formatYupError_1.formatYupError)(error);
            }
            const existingConversation = yield Message_1.Message.findOne({
                where: { listingId, userIdOfGuest: userId },
            });
            if (existingConversation) {
                return {
                    __typename: "Redirect",
                    redirect: process.env.FRONTEND_HOST +
                        `/inbox/${existingConversation.conversationId}?text=${text}`,
                };
            }
            else {
                const conversationId = (0, uuid_1.v4)();
                const dbMessage = yield Message_1.Message.create({
                    text,
                    fromHost: false,
                    userIdOfGuest: userId,
                    userIdOfHost: listing.userId,
                    listingId,
                    conversationId,
                }).save();
                yield pubSub.publish("newMessage", dbMessage.conversationId, Object.assign({}, dbMessage));
                return {
                    __typename: "ConversationId",
                    conversationId: dbMessage.conversationId,
                };
            }
        }),
    },
};
//# sourceMappingURL=resolvers.js.map