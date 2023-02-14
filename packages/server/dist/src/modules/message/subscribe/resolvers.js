"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const node_1 = require("@graphql-yoga/node");
exports.resolvers = {
    Subscription: {
        newMessage: {
            subscribe: (_, { conversationId }, { pubSub }) => (0, node_1.pipe)(pubSub.subscribe("newMessage"), (0, node_1.filter)(({ newMessage }) => newMessage.conversationId === conversationId)),
            resolve: (payload) => {
                console.log("payload", payload.newMessage);
                return payload.newMessage;
            },
        },
    },
};
//# sourceMappingURL=resolvers.js.map