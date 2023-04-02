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
const Message_1 = require("../../../entity/Message");
const errorMessages_1 = require("../../shared/utils/errorMessages");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const formatYupError_1 = require("../../shared/utils/formatYupError");
const errorMessages_2 = require("./utils/errorMessages");
exports.resolvers = {
    Mutation: {
        createMessage: (_, args, { req: { session: { userId }, }, pubSub, }) => __awaiter(void 0, void 0, void 0, function* () {
            const { conversationId, text } = args;
            const existingConversation = yield Message_1.Message.findOne({
                where: { conversationId },
            });
            if (!existingConversation) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)((0, errorMessages_1.formatNotFoundWithGivenIdErrorMessage)("conversation", conversationId));
            }
            const { listingId: existingListingId, userIdOfGuest, userIdOfHost, } = existingConversation;
            if (userId !== userIdOfGuest && userId !== userIdOfHost) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_2.noPermissionToParticipateInConversationErrorMessage);
            }
            try {
                yield common_1.messageSchema.validate(args);
            }
            catch (error) {
                return (0, formatYupError_1.formatYupError)(error);
            }
            const fromHost = userId === userIdOfHost ? true : false;
            const dbMessage = yield Message_1.Message.create({
                text,
                fromHost,
                userIdOfGuest,
                userIdOfHost,
                listingId: existingListingId,
                conversationId,
            }).save();
            yield pubSub.publish("newMessage", conversationId, Object.assign({}, dbMessage));
            yield pubSub.publish("newMessage", userIdOfGuest, Object.assign({}, dbMessage));
            yield pubSub.publish("newMessage", userIdOfHost, Object.assign({}, dbMessage));
            return dbMessage.conversationId;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map