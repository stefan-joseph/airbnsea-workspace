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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const User_1 = require("../../../entity/User");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const common_1 = require("@airbnb-clone/common");
const formatYupError_1 = __importDefault(require("../../shared/utils/formatYupError"));
exports.resolvers = {
    Query: {
        checkEmail: (_, { email }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield common_1.checkEmailSchema.validate({ email });
            }
            catch (error) {
                return Object.assign({ __typename: "ValidationError" }, (0, formatYupError_1.default)(error));
            }
            const user = yield User_1.User.findOne({
                where: { email: email.toLowerCase() },
            });
            if (user) {
                if (!user.confirmed) {
                    return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("Your email has not been confirmed");
                }
                const { email, firstName, avatar, oAuth } = user;
                if (user.password) {
                    return {
                        __typename: "EmailExistsWithPassword",
                        email,
                        userExists: true,
                    };
                }
                return {
                    __typename: "EmailExistsWithOAuth",
                    authorizationServer: oAuth,
                    email,
                    firstName,
                    avatar,
                };
            }
            return { __typename: "NoUserWithThisEmail", email, userExists: false };
        }),
    },
};
//# sourceMappingURL=resolvers.js.map