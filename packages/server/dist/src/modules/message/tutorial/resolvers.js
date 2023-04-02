"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        room: () => [],
    },
    Mutation: {
        send: (_, { input }, { pubSub }) => {
            const { roomId } = input, newMessage = __rest(input, ["roomId"]);
            pubSub.publish("newMessage", roomId, newMessage);
            return newMessage;
        },
    },
    Subscription: {},
};
//# sourceMappingURL=resolvers.js.map