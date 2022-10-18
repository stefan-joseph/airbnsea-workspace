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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordController = exports.ForgotPasswordController = exports.LoginController = exports.RegisterController = exports.normalizeErrors = void 0;
__exportStar(require("./generated/graphql-hooks"), exports);
var normalizeErrors_1 = require("./utils/normalizeErrors");
Object.defineProperty(exports, "normalizeErrors", { enumerable: true, get: function () { return normalizeErrors_1.normalizeErrors; } });
var registerController_1 = require("./modules/auth/register/registerController");
Object.defineProperty(exports, "RegisterController", { enumerable: true, get: function () { return registerController_1.RegisterController; } });
var loginController_1 = require("./modules/auth/login/loginController");
Object.defineProperty(exports, "LoginController", { enumerable: true, get: function () { return loginController_1.LoginController; } });
var forgotPasswordController_1 = require("./modules/auth/forgotPassword/forgotPasswordController");
Object.defineProperty(exports, "ForgotPasswordController", { enumerable: true, get: function () { return forgotPasswordController_1.ForgotPasswordController; } });
var resetPasswordController_1 = require("./modules/auth/resetPassword/resetPasswordController");
Object.defineProperty(exports, "ResetPasswordController", { enumerable: true, get: function () { return resetPasswordController_1.ResetPasswordController; } });
//# sourceMappingURL=index.js.map