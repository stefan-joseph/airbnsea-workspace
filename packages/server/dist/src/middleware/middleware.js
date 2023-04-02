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
exports.listingIdMiddleware = exports.isValidUuid = exports.authMiddleware = void 0;
const formatGraphQLYogaError_1 = require("../modules/shared/utils/formatGraphQLYogaError");
const validate = require("uuid-validate");
const errorMessages_1 = require("../modules/shared/utils/errorMessages");
const isAuthenticated = (resolve, root, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!context.req.session.userId) {
        return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("Please log in to use this service");
    }
    return resolve(root, args, context, info);
});
exports.authMiddleware = {
    Mutation: {
        createListing: isAuthenticated,
        deleteListing: isAuthenticated,
        createBooking: isAuthenticated,
        createConversation: isAuthenticated,
        createMessage: isAuthenticated,
    },
    Query: {
        me: isAuthenticated,
        populateInbox: isAuthenticated,
        populateConversation: isAuthenticated,
    },
    Subscription: { newMessage: isAuthenticated },
};
const isValidUuid = (resolve, root, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Object.keys(args).find((key) => key.includes("Id"));
    if (!validate(args[id])) {
        return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)((0, errorMessages_1.formatBadUuidErrorMessage)(id));
    }
    return resolve(root, args, context, info);
});
exports.isValidUuid = isValidUuid;
exports.listingIdMiddleware = {
    Mutation: {
        createConversation: exports.isValidUuid,
        createMessage: exports.isValidUuid,
        createBooking: exports.isValidUuid,
    },
    Query: {
        populateConversation: exports.isValidUuid,
    },
    Subscription: { newMessage: exports.isValidUuid },
};
//# sourceMappingURL=middleware.js.map