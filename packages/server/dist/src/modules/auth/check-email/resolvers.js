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
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const common_1 = require("@airbnb-clone/common");
exports.resolvers = {
    Query: {
        checkEmail: (_, { email }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield common_1.checkEmailSchema.validate({ email }, { abortEarly: false });
            }
            catch (error) {
                const formatYupError = (error) => {
                    const { message, path } = error.inner[0];
                    return { message, field: path };
                };
                return Object.assign({ __typename: "BadCredentialsError" }, formatYupError(error));
            }
            const user = yield User_1.User.findOne({
                where: { email: email.toLowerCase() },
            });
            let userExists = false;
            if (user) {
                userExists = true;
                if (!user.confirmed) {
                    return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("Your email has not been confirmed");
                }
                if (user.password) {
                    return { userExists };
                }
                const { email, firstName, avatar, oAuth } = user;
                return {
                    userExists,
                    oAuth: {
                        authorizationServer: oAuth,
                        emailReminder: email,
                        firstName,
                        avatar,
                    },
                };
            }
            return { userExists };
        }),
    },
};
//# sourceMappingURL=resolvers.js.map