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
const constants_1 = require("../../shared/utils/constants");
const errorMessages_1 = require("../../shared/utils/errorMessages");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const errorMessages_2 = require("./utils/errorMessages");
exports.resolvers = {
    Conversation: {
        listing: ({ listingId }) => __awaiter(void 0, void 0, void 0, function* () {
            const listing = yield Listing_1.Listing.findOneBy({ id: listingId });
            if (!listing)
                return null;
            return { name: listing.name, img: constants_1.imageUrl + listing.photos[0] };
        }),
        interlocutor: ({ interlocutorId }, _, { userLoader }) => userLoader.load(interlocutorId),
        interlocutorId: () => null,
    },
    Query: {
        populateConversation: (_, { conversationId }, { req: { session: { userId }, }, }) => __awaiter(void 0, void 0, void 0, function* () {
            const messages = yield Message_1.Message.find({
                where: { conversationId },
                order: { createdDate: "ASC" },
            });
            if (messages.length < 1) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)((0, errorMessages_1.formatNotFoundWithGivenIdErrorMessage)("conversation", conversationId));
            }
            const { userIdOfGuest, userIdOfHost } = messages[0];
            if (userIdOfGuest !== userId && userIdOfHost !== userId) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_2.noPermissionToViewConversationErrorMessage);
            }
            const interlocutorId = userIdOfGuest === userId ? userIdOfHost : userIdOfGuest;
            return {
                interlocutorId,
                listingId: messages[0].listingId,
                conversationId,
                messages,
            };
        }),
    },
};
//# sourceMappingURL=resolvers.js.map