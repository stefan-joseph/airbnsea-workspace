"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeErrors = void 0;
const normalizeErrors = (errors) => {
    const errMap = {};
    errors.forEach((err) => {
        errMap[err.path] = err.message;
    });
    return errMap;
};
exports.normalizeErrors = normalizeErrors;
//# sourceMappingURL=normalizeErrors.js.map