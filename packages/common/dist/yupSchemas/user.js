"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.validUserSchema = exports.registerPasswordValidation = exports.passwordNotLongEnough = exports.invalidEmail = exports.emailNotLongEnough = void 0;
const yup = __importStar(require("yup"));
exports.emailNotLongEnough = "Email must be at least 3 characters";
exports.invalidEmail = "Email must be a valid email";
exports.passwordNotLongEnough = "Password must be at least 6 characters";
exports.registerPasswordValidation = yup
    .string()
    .required("You need to create a password")
    .min(6, exports.passwordNotLongEnough)
    .max(255, "Password must not exceed 255 characters");
exports.validUserSchema = yup.object().shape({
    email: yup
        .string()
        .required()
        .min(3, exports.emailNotLongEnough)
        .max(255)
        .email(exports.invalidEmail),
    password: exports.registerPasswordValidation,
});
const invalidLogin = "invalid login";
exports.loginSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, invalidLogin)
        .max(255, invalidLogin)
        .email(exports.invalidEmail)
        .required(),
    password: yup.string().required().min(6, invalidLogin).max(255, invalidLogin),
});
exports.forgotPasswordSchema = yup.object().shape({
    email: yup.string().email(exports.invalidEmail),
});
exports.resetPasswordSchema = yup.object().shape({
    newPassword: exports.registerPasswordValidation,
    newPassword2: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});
//# sourceMappingURL=user.js.map