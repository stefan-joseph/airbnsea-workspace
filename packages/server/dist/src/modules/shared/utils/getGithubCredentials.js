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
const axios_1 = __importDefault(require("axios"));
const formatGraphQLYogaError_1 = require("./formatGraphQLYogaError");
const errorMessages_1 = require("../../auth/oauth/errorMessages");
function getGithubCredentials(code) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios_1.default
            .post("https://github.com/login/oauth/access_token", {
            client_id: process.env.GITHUB_AUTH_CLIENT_ID,
            client_secret: process.env.GITHUB_AUTH_CLIENT_SECRET,
            code,
        }, {
            headers: {
                Accept: "application/json",
            },
        })
            .then(({ data }) => __awaiter(this, void 0, void 0, function* () {
            const accessToken = data.access_token;
            const response = yield (0, axios_1.default)("https://api.github.com/user", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return {
                accessToken,
                response: response,
            };
        }))
            .then(({ response, accessToken }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let { email, name, avatar_url } = response.data;
            let firstName;
            if (name) {
                firstName = name.split(" ")[0];
            }
            const avatarImg = avatar_url;
            if (email) {
                return { email, firstName, avatarImg };
            }
            const response2 = yield (0, axios_1.default)("https://api.github.com/user/emails", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const emails = response2
                .data;
            email = ((_a = emails.find((email) => email.primary)) === null || _a === void 0 ? void 0 : _a.email) || null;
            return { email: email || undefined, firstName, avatarImg };
        }))
            .catch((err) => {
            console.log("getGithubCredentialsERROR", err);
            return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.badGithubOauthRequest);
        });
    });
}
exports.default = getGithubCredentials;
//# sourceMappingURL=getGithubCredentials.js.map