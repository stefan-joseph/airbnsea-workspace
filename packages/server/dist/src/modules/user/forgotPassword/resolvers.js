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
exports.resolvers = void 0;
const User_1 = require("../../../entity/User");
const bcryptjs_1 = require("bcryptjs");
const constants_1 = require("../../../utils/constants");
const createForgotPasswordLink_1 = require("../../../utils/createForgotPasswordLink");
const forgotPasswordLockAccount_1 = require("../../../utils/forgotPasswordLockAccount");
const errorMessages_1 = require("./errorMessages");
const formatYupError_1 = require("../../../utils/formatYupError");
const sendEmail_1 = require("../../../utils/sendEmail");
const common_1 = require("@airbnb-clone/common");
exports.resolvers = {
    Mutation: {
        sendForgotPasswordEmail: (_, { email }, { redis }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!email)
                return true;
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user)
                return true;
            yield (0, forgotPasswordLockAccount_1.forgotPasswordLockAccount)(user.id, redis);
            const url = yield (0, createForgotPasswordLink_1.createForgotPasswordLink)((process.env.NODE_ENV === "development"
                ? process.env.FRONTEND_HOST_DEV
                : process.env.FRONTEND_HOST_PROD), user.id, redis);
            yield (0, sendEmail_1.sendEmail)(email, url, "Click here to reset your password");
            return true;
        }),
        resetPassword: (_, { newPassword, key }, { redis }) => __awaiter(void 0, void 0, void 0, function* () {
            const redisKey = `${constants_1.forgotPasswordPrefix}${key}`;
            const userId = yield redis.get(redisKey);
            if (!userId) {
                return [
                    {
                        path: "newPassword",
                        message: errorMessages_1.expiredKeyError,
                    },
                ];
            }
            try {
                yield common_1.resetPasswordSchema.validate({ newPassword }, { abortEarly: false });
            }
            catch (error) {
                return (0, formatYupError_1.formatYupError)(error);
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(newPassword, 10);
            const updateUserPromise = User_1.User.update({ id: userId }, {
                forgotPasswordLocked: false,
                password: hashedPassword,
            });
            const deleteKeyPromise = redis.del(redisKey);
            yield Promise.all([updateUserPromise, deleteKeyPromise]);
            return null;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map