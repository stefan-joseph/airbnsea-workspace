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
const querystring_1 = require("querystring");
const errorMessages_1 = require("../../auth/oauth/errorMessages");
const formatGraphQLYogaError_1 = require("./formatGraphQLYogaError");
function getLinkedinCredentials(code) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios_1.default
            .post("https://www.linkedin.com/oauth/v2/accessToken", (0, querystring_1.stringify)({
            grant_type: "authorization_code",
            code,
            client_id: process.env.LINKEDIN_AUTH_CLIENT_ID,
            client_secret: process.env.LINKEDIN_AUTH_CLIENT_SECRET,
            redirect_uri: `${process.env.FRONTEND_HOST}/auth/linkedin`,
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(({ data }) => __awaiter(this, void 0, void 0, function* () {
            const accessToken = data.access_token;
            return yield (0, axios_1.default)("https://api.linkedin.com/v2/userinfo", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
        }))
            .then(({ data }) => {
            const { email, email_verified, given_name, picture } = data;
            return {
                email: email && email_verified ? email : undefined,
                firstName: given_name,
                avatarImg: picture,
            };
        })
            .catch((err) => {
            console.log("getLinkedinCredentialsERROR", err);
            return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.badLinkedinOauthRequest);
        });
    });
}
exports.default = getLinkedinCredentials;
//# sourceMappingURL=getLinkedinCredentials.js.map