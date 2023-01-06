"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const node_1 = require("@graphql-yoga/node");
exports.resolvers = {
    Subscription: {
        newMessage: {
            subscribe: (_, { listingId }, { pubSub }) => (0, node_1.pipe)(pubSub.asyncIterator("newMessage"), (0, node_1.filter)(({ newMessage }) => newMessage.listingId === listingId)),
            resolve: (payload) => {
                console.log("payload", payload);
                return payload.newMessage;
            },
        },
    },
};
//# sourceMappingURL=resolvers.js.map