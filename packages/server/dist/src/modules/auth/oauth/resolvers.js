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
exports.resolvers = exports.formatNoEmailError = void 0;
const types_1 = require("../../../types/types");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const User_1 = require("../../../entity/User");
const constants_1 = require("../../../utils/constants");
const common_1 = require("@airbnb-clone/common");
const getGithubCredentials_1 = __importDefault(require("../../shared/utils/getGithubCredentials"));
const getLinkedinCredentials_1 = __importDefault(require("../../shared/utils/getLinkedinCredentials"));
const formatNoEmailError = (authServer) => `Cannot access the email associated with your ${authServer} account.
Please use an alternative sign up method 
or check the email settings for your ${authServer} account.`;
exports.formatNoEmailError = formatNoEmailError;
exports.resolvers = {
    Mutation: {
        authenticateUserWithOauth: (_, { code, authServer }, { req, redis }) => __awaiter(void 0, void 0, void 0, function* () {
            let credentials;
            if (authServer === types_1.AuthorizationServer["Linkedin"]) {
                credentials = yield (0, getLinkedinCredentials_1.default)(code);
            }
            else if (authServer === types_1.AuthorizationServer["Github"]) {
                credentials = yield (0, getGithubCredentials_1.default)(code);
            }
            const email = credentials === null || credentials === void 0 ? void 0 : credentials.email;
            const avatarImg = credentials === null || credentials === void 0 ? void 0 : credentials.avatarImg;
            if (!email) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)((0, exports.formatNoEmailError)(authServer));
            }
            const userAlreadyExists = yield User_1.User.findOne({
                where: { email },
            });
            if (userAlreadyExists) {
                const { id, avatar, firstName, password, authorizationServer } = userAlreadyExists;
                if (password && !authorizationServer) {
                    return { __typename: "UserAlreadyExists", email, firstName, avatar };
                }
                if (authorizationServer !== authServer) {
                    return {
                        __typename: "UserExistsWithOAuth",
                        email,
                        firstName,
                        avatar,
                        authorizationServer,
                    };
                }
                if (!avatar && avatarImg) {
                    yield User_1.User.update({ id }, { avatar: avatarImg });
                }
                req.session.userId = id;
                if (req.sessionID) {
                    yield redis.lpush(`${constants_1.userSessionIdPrefix}${id}`, req.sessionID);
                }
                return { __typename: "SuccessResponse", success: true };
            }
            let firstName = credentials === null || credentials === void 0 ? void 0 : credentials.firstName;
            if (!firstName) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("no name on account");
            }
            firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            try {
                yield common_1.registerOAuthUserSchema.validate({ email, firstName });
            }
            catch (error) {
                console.log(error);
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("yup validation error");
            }
            const user = User_1.User.create({
                email,
                firstName: firstName.toLowerCase(),
                avatar: avatarImg,
                confirmed: true,
                authorizationServer: authServer,
            });
            const { id } = yield user.save();
            req.session.userId = id;
            if (req.sessionID) {
                yield redis.lpush(`${constants_1.userSessionIdPrefix}${id}`, req.sessionID);
            }
            return { __typename: "SuccessResponse", success: true };
        }),
    },
};
//# sourceMappingURL=resolvers.js.map