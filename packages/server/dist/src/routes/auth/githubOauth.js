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
exports.githubOauth = void 0;
const axios_1 = __importDefault(require("axios"));
const githubOauth = (req, _) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { data } = yield axios_1.default.post("https://github.com/login/oauth/access_token", {
        client_id: process.env.GITHUB_AUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_AUTH_CLIENT_SECRET,
        code: req.query.code,
    }, {
        headers: {
            Accept: "application/json",
        },
    });
    let email;
    const { data: data2 } = yield (0, axios_1.default)("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${data.access_token}` },
    });
    console.log("data2", data2);
    email = data2.email;
    if (!email) {
        const { data: data3 } = yield (0, axios_1.default)("https://api.github.com/user/emails", {
            headers: { Authorization: `Bearer ${data.access_token}` },
        });
        const emails = data3;
        email = (_a = emails.find((email) => email.primary)) === null || _a === void 0 ? void 0 : _a.email;
    }
    console.log("email", email);
    if (!email) {
    }
    if (!data2.name) {
    }
});
exports.githubOauth = githubOauth;
//# sourceMappingURL=githubOauth.js.map