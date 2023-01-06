"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYupError = void 0;
const formatGraphQLYogaError_1 = require("./formatGraphQLYogaError");
const formatYupError = (error) => (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(error.errors[0]);
exports.formatYupError = formatYupError;
//# sourceMappingURL=formatYupError.js.map