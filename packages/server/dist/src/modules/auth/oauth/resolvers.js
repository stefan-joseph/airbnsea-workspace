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
const types_1 = require("../../../types/types");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const errorMessages_1 = require("./errorMessages");
const User_1 = require("../../../entity/User");
const constants_1 = require("../../../utils/constants");
const common_1 = require("@airbnb-clone/common");
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
                    console.log("error", response.error);
                    return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(response.error.message);
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
                console.log("response2", response2);
                email = response2.email;
            }
            catch (_c) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.badGithubOauthRequest);
            }
            if (!email) {
                try {
                    const { data } = yield (0, axios_1.default)("https://api.github.com/user/emails", {
                        headers: { Authorization: `Bearer ${response.access_token}` },
                    });
                    console.log("response3", data);
                    const emails = data;
                    email = (_a = emails.find((email) => email.primary)) === null || _a === void 0 ? void 0 : _a.email;
                }
                catch (_d) {
                    return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.badGithubOauthRequest);
                }
            }
            console.log("email", email);
            if (!email) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(`Cannot access the email associated with your Github account.
          Please use an alternative sign up method 
          or check the email settings on your github account.`);
            }
            const userAlreadyExists = yield User_1.User.findOne({
                where: { email },
            });
            if (userAlreadyExists) {
                console.log(userAlreadyExists);
                const { id, confirmed, avatar, password, oAuth } = userAlreadyExists;
                if (password && !oAuth) {
                }
                if (!confirmed) {
                    return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("Not confirmed");
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
            const { name, avatar_url } = response2;
            if (!name) {
                console.log("no name");
                return false;
            }
            let firstName = name.split(" ")[0];
            firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            try {
                yield common_1.registerOAuthUserSchema.validate({ email, firstName }, { abortEarly: false });
            }
            catch (error) {
                console.log(error);
            }
            const user = User_1.User.create({
                email,
                firstName,
                avatar: avatar_url,
                confirmed: true,
                oAuth: types_1.AuthorizationServer["Github"],
            });
            const { id } = yield user.save();
            req.session.userId = id;
            if (req.sessionID) {
                yield redis.lpush(`${constants_1.userSessionIdPrefix}${id}`, req.sessionID);
            }
            return true;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map