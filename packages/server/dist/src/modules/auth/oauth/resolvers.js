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
const axios_1 = __importDefault(require("axios"));
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const errorMessages_1 = require("./errorMessages");
const User_1 = require("../../../entity/User");
const constants_1 = require("../../../utils/constants");
exports.resolvers = {
    Mutation: {
        authenticateUserWithOauth: (_, { code }, { redis, req }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            let response;
            try {
                const { data } = yield axios_1.default.post("https://github.com/login/oauth/access_token", {
                    client_id: process.env.GITHUB_AUTH_CLIENT_ID,
                    client_secret: process.env.GITHUB_AUTH_CLIENT_SECRET,
                    code,
                }, {
                    headers: {
                        Accept: "application/json",
                    },
                });
                response = data;
                if (response.error) {
                    throw Error;
                }
            }
            catch (_b) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.badGithubOauthRequest);
            }
            let email;
            let response2;
            try {
                const { data } = yield (0, axios_1.default)("https://api.github.com/user", {
                    headers: { Authorization: `Bearer ${response.access_token}` },
                });
                response2 = data;
            }
            catch (_c) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.badGithubOauthRequest);
            }
            console.log("response2", response2);
            email = response2.email;
            if (!email) {
                try {
                    const { data } = yield (0, axios_1.default)("https://api.github.com/user/emails", {
                        headers: { Authorization: `Bearer ${response.access_token}` },
                    });
                    const emails = data;
                    email = (_a = emails.find((email) => email.primary)) === null || _a === void 0 ? void 0 : _a.email;
                }
                catch (_d) {
                    return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.badGithubOauthRequest);
                }
            }
            console.log("email", email);
            if (!email) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("Cannot access the email associated with your Github account. Please use an alternative sign up method.");
            }
            const userAlreadyExists = yield User_1.User.findOne({
                where: { email },
            });
            if (userAlreadyExists) {
                console.log(userAlreadyExists);
                const { id, confirmed, avatar } = userAlreadyExists;
                if (!confirmed) {
                    yield User_1.User.update({ id }, { confirmed: true });
                }
                if (!avatar && response2.avatar_url) {
                    yield User_1.User.update({ id }, { avatar: response2.avatar_url });
                }
                req.session.userId = id;
                if (req.sessionID) {
                    yield redis.lpush(`${constants_1.userSessionIdPrefix}${id}`, req.sessionID);
                }
                return true;
            }
            if (!response2.name) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("You do not have a name asscoiated with your Github account. Please add one or use an alternative method to sign up.");
            }
            return true;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map