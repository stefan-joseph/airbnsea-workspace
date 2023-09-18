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
const validate = require("uuid-validate");
const errorMessages_1 = require("../../shared/utils/errorMessages");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
exports.resolvers = {
    Subscription: {
        newMessage: {
            subscribe: (_, { conversationId }, { req: { session: { userId }, }, pubSub, }) => __awaiter(void 0, void 0, void 0, function* () {
                if (!validate(conversationId))
                    return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)((0, errorMessages_1.formatBadUuidErrorMessage)(Object.keys({ conversationId })[0]));
                if (!validate(userId))
                    return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.unauthenticatedErrorMessage);
                const message = yield Message_1.Message.findOne({
                    where: [
                        { conversationId, userIdOfGuest: userId },
                        { conversationId, userIdOfHost: userId },
                    ],
                });
                if (!message)
                    return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("You do not have permission to view this conversation");
                return pubSub.subscribe("newMessage", conversationId);
            }),
            resolve: (payload) => {
                return payload;
            },
        },
        updateInbox: {
            subscribe: (_, __, { req: { session: { userId }, }, pubSub, }) => __awaiter(void 0, void 0, void 0, function* () {
                if (!validate(userId))
                    return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.unauthenticatedErrorMessage);
                return pubSub.subscribe("newMessage", userId);
            }),
            resolve: (payload) => {
                return payload;
            },
        },
    },
};
//# sourceMappingURL=resolvers.js.map