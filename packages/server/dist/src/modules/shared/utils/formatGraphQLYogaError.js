"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatGraphQLYogaError = void 0;
const node_1 = require("@graphql-yoga/node");
const formatGraphQLYogaError = (message) => Promise.reject(new node_1.GraphQLYogaError(message));
exports.formatGraphQLYogaError = formatGraphQLYogaError;
//# sourceMappingURL=formatGraphQLYogaError.js.map