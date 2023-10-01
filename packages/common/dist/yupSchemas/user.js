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
exports.loginSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.registerOAuthUserSchema = exports.registerUserSchemaWithPassword2 = exports.registerUserSchema = exports.checkEmailSchema = exports.nameTooLong = exports.nameNotLongEnough = exports.passwordNotLongEnough = exports.invalidEmail = exports.emailNotLongEnough = void 0;
const yup = __importStar(require("yup"));
exports.emailNotLongEnough = "Email must be at least 3 characters.";
exports.invalidEmail = "Enter a valid email.";
exports.passwordNotLongEnough = "Password must be at least 6 characters.";
exports.nameNotLongEnough = "First name on account must be at least 2 characters.";
exports.nameTooLong = "First name on account must not exceed 50 characters.";
const email = yup.string().required("Email is required").email(exports.invalidEmail);
exports.checkEmailSchema = yup.object().shape({
    email,
});
const password = yup
    .string()
    .required("A password is required.")
    .min(6, exports.passwordNotLongEnough)
    .max(255, "Password must not exceed 255 characters.");
const password2 = yup
    .string()
    .test("matches_password", "Passwords must match.", function (value) {
    return value === this.parent.password;
});
const firstName = yup
    .string()
    .required("A first name on the account is required.")
    .min(2, exports.nameNotLongEnough)
    .max(50, exports.nameTooLong);
exports.registerUserSchema = yup.object().shape({
    email,
    password,
    firstName,
});
exports.registerUserSchemaWithPassword2 = yup.object().shape({
    email,
    password,
    password2,
    firstName,
});
exports.registerOAuthUserSchema = yup.object().shape({
    email,
    firstName,
});
exports.forgotPasswordSchema = yup.object().shape({
    email: yup.string().email(exports.invalidEmail),
});
exports.resetPasswordSchema = yup.object().shape({
    newPassword: password,
    newPassword2: password2,
});
const invalidLogin = "Invalid login";
exports.loginSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, invalidLogin)
        .max(255, invalidLogin)
        .email(exports.invalidEmail)
        .required(),
    password: yup.string().required().min(6, invalidLogin).max(255, invalidLogin),
});
//# sourceMappingURL=user.js.map