"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYupGraphQLError = void 0;
const formatGraphQLYogaError_1 = require("./formatGraphQLYogaError");
function formatYupError(error) {
    const { errors, path } = error;
    return { message: errors[0], field: path };
}
exports.default = formatYupError;
const formatYupGraphQLError = (error) => (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(error.errors[0]);
exports.formatYupGraphQLError = formatYupGraphQLError;
//# sourceMappingURL=formatYupError.js.map