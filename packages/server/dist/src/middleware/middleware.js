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
exports.middleware = exports.isAuthenticated = void 0;
const formatGraphQLYogaError_1 = require("../modules/shared/utils/formatGraphQLYogaError");
const isAuthenticated = (resolve, parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!context.req.session.userId) {
        return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(`Please log in to use this service`);
    }
    return resolve(parent, args, context, info);
});
exports.isAuthenticated = isAuthenticated;
exports.middleware = {
    Mutation: {
        createListing: exports.isAuthenticated,
        deleteListing: exports.isAuthenticated,
        createBooking: exports.isAuthenticated,
        createGuestMessage: exports.isAuthenticated,
        createHostMessage: exports.isAuthenticated,
    },
    Query: {
        me: exports.isAuthenticated,
    },
};
//# sourceMappingURL=middleware.js.map