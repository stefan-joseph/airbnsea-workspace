"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYupError = void 0;
const formatYupError = (error) => {
    const errors = [];
    error.inner.forEach((err) => {
        errors.push({
            path: err.path,
            message: err.message,
        });
    });
    return errors;
};
exports.formatYupError = formatYupError;
//# sourceMappingURL=formatYupError.js.map