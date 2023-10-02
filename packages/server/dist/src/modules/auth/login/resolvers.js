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
const bcryptjs_1 = require("bcryptjs");
const common_1 = require("@airbnb-clone/common");
const User_1 = require("../../../entity/User");
const errorMessages_1 = require("./errorMessages");
const constants_1 = require("../../../utils/constants");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const formatYupError_1 = __importDefault(require("../../shared/utils/formatYupError"));
exports.resolvers = {
    Mutation: {
        login: (_, args, { redis, req }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield common_1.loginSchema.validate(args);
            }
            catch (error) {
                return Object.assign({ __typename: "ValidationError" }, (0, formatYupError_1.default)(error));
            }
            const { email, password } = args;
            const user = yield User_1.User.findOne({
                where: { email: email.toLowerCase() },
            });
            if (!user) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.invalidCredentails);
            }
            if (!user.confirmed) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.confirmEmailError);
            }
            const validPassword = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!validPassword) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.invalidCredentails);
            }
            req.session.userId = user.id;
            if (req.sessionID) {
                yield redis.lpush(`${constants_1.userSessionIdPrefix}${user.id}`, req.sessionID);
            }
            return { __typename: "SuccessResponse", success: true };
        }),
    },
};
//# sourceMappingURL=resolvers.js.map