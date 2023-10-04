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
const bcryptjs_1 = require("bcryptjs");
const constants_1 = require("../../../utils/constants");
const createForgotPasswordLink_1 = require("../../../utils/createForgotPasswordLink");
const errorMessages_1 = require("./errorMessages");
const sendEmail_1 = require("../../../utils/sendEmail");
const common_1 = require("@airbnb-clone/common");
const removeAllOfUsersSessions_1 = require("../../../utils/removeAllOfUsersSessions");
const formatYupError_1 = __importDefault(require("../../shared/utils/formatYupError"));
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
exports.resolvers = {
    Mutation: {
        sendForgotPasswordEmail: (_, args, { redis }) => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = args;
            try {
                yield common_1.forgotPasswordSchema.validate(args);
            }
            catch (error) {
                return Object.assign({ __typename: "ValidationError" }, (0, formatYupError_1.default)(error));
            }
            const user = yield User_1.User.findOne({
                where: { email: email.toLowerCase() },
            });
            if (!user) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(`No account exists for ${email}. Maybe you signed up using a different/incorrect email address.`);
            }
            yield (0, removeAllOfUsersSessions_1.removeAllOfUsersSessions)(user.id, redis);
            const url = yield (0, createForgotPasswordLink_1.createForgotPasswordLink)(process.env.FRONTEND_HOST, user.id, redis);
            yield (0, sendEmail_1.sendEmail)(email, url, "Click here to reset your password");
            return { __typename: "ForgotPasswordEmailSuccessResponse", email };
        }),
        resetPassword: (_, args, { redis }) => __awaiter(void 0, void 0, void 0, function* () {
            const { newPassword, key } = args;
            const redisKey = `${constants_1.forgotPasswordPrefix}${key}`;
            const userId = yield redis.get(redisKey);
            if (!userId) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.expiredKeyError);
            }
            try {
                yield common_1.resetPasswordSchema.validate(args);
            }
            catch (error) {
                return Object.assign({ __typename: "ValidationError" }, (0, formatYupError_1.default)(error));
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(newPassword, 10);
            const updateUserPromise = User_1.User.update({ id: userId }, {
                password: hashedPassword,
            });
            const deleteKeyPromise = redis.del(redisKey);
            yield Promise.all([updateUserPromise, deleteKeyPromise]);
            return { __typename: "SuccessResponse", success: true };
        }),
    },
};
//# sourceMappingURL=resolvers.js.map