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
const common_1 = require("@airbnb-clone/common");
const formatYupError_1 = __importDefault(require("../../shared/utils/formatYupError"));
const createConfirmEmailLink_1 = require("../../../utils/createConfirmEmailLink");
const sendEmail_1 = require("../../../utils/sendEmail");
exports.resolvers = {
    Query: {
        checkEmail: (_, { email }, { redis }) => __awaiter(void 0, void 0, void 0, function* () {
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
                const { email, firstName, avatar, authorizationServer, confirmed } = user;
                if (!confirmed) {
                    const url = yield (0, createConfirmEmailLink_1.createConfirmEmailLink)(process.env.FRONTEND_HOST, user.id, redis);
                    console.log(email);
                    if (process.env.NODE_ENV !== "test") {
                        yield (0, sendEmail_1.sendEmail)(email, url, "Click here to confirm your email");
                    }
                    return {
                        __typename: "UserNotConfirmed",
                        email,
                        userExists: true,
                    };
                }
                console.log(email);
                if (user.password) {
                    return {
                        __typename: "UserExistsWithPassword",
                        email,
                        userExists: true,
                    };
                }
                console.log(email);
                return {
                    __typename: "UserExistsWithOAuth",
                    authorizationServer,
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