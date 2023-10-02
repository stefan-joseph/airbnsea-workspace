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
const errorMessages_1 = require("./errorMessages");
const createConfirmEmailLink_1 = require("../../../utils/createConfirmEmailLink");
const sendEmail_1 = require("../../../utils/sendEmail");
const common_1 = require("@airbnb-clone/common");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const formatYupError_1 = __importDefault(require("../../shared/utils/formatYupError"));
exports.resolvers = {
    Mutation: {
        register: (_, args, { redis }) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password, firstName } = args;
            try {
                yield common_1.registerUserSchema.validate(args);
            }
            catch (error) {
                return Object.assign({ __typename: "ValidationError" }, (0, formatYupError_1.default)(error));
            }
            const userAlreadyExists = yield User_1.User.findOne({
                where: { email },
                select: ["id"],
            });
            if (userAlreadyExists) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(errorMessages_1.duplicateEmail);
            }
            const user = User_1.User.create({
                email,
                password,
                firstName,
            });
            yield user.save();
            const url = yield (0, createConfirmEmailLink_1.createConfirmEmailLink)(process.env.FRONTEND_HOST, user.id, redis);
            if (process.env.NODE_ENV !== "test") {
                yield (0, sendEmail_1.sendEmail)(email, url, "Click here to confirm your email");
            }
            return { __typename: "SuccessResponse", success: true };
        }),
    },
};
//# sourceMappingURL=resolvers.js.map