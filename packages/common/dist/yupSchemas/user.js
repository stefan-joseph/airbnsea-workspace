"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.resetPasswordSchemaWithPassword2 = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.registerOAuthUserSchema = exports.registerUserSchema = exports.checkEmailSchema = exports.nameTooLong = exports.nameNotLongEnough = exports.passwordNotLongEnough = exports.invalidEmail = exports.emailNotLongEnough = void 0;
const yup_1 = require("yup");
exports.emailNotLongEnough = "Email must be at least 3 characters.";
exports.invalidEmail = "Enter a valid email.";
exports.passwordNotLongEnough = "Password must be at least 6 characters.";
exports.nameNotLongEnough = "First name on account must be at least 2 characters.";
exports.nameTooLong = "First name on account must not exceed 50 characters.";
const email = (0, yup_1.string)().trim().required("Email is required").email(exports.invalidEmail);
exports.checkEmailSchema = (0, yup_1.object)().shape({
    email,
});
const password = (0, yup_1.string)()
    .trim()
    .required("A password is required.")
    .min(6, exports.passwordNotLongEnough)
    .max(255, "Password must not exceed 255 characters.");
const newPassword2 = (0, yup_1.string)().test("matches_password", "Passwords must match.", function (value) {
    return value === this.parent.newPassword;
});
const firstName = (0, yup_1.string)()
    .trim()
    .required("A first name on the account is required.")
    .min(2, exports.nameNotLongEnough)
    .max(50, exports.nameTooLong);
exports.registerUserSchema = (0, yup_1.object)().shape({
    email,
    password,
    firstName,
});
exports.registerOAuthUserSchema = (0, yup_1.object)().shape({
    email,
    firstName,
});
exports.forgotPasswordSchema = (0, yup_1.object)().shape({
    email,
});
exports.resetPasswordSchema = (0, yup_1.object)().shape({
    newPassword: password,
});
exports.resetPasswordSchemaWithPassword2 = (0, yup_1.object)().shape({
    newPassword: password,
    newPassword2,
});
exports.loginSchema = (0, yup_1.object)().shape({
    email,
    password,
});
//# sourceMappingURL=user.js.map