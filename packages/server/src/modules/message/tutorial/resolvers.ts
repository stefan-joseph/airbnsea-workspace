import { MessagePayload } from "../../../startServer";
import { Resolvers } from "../../../types/types";
// import { pipe, filter } from "@graphql-yoga/node";

export const resolvers: Resolvers = {
  Query: {
    room: () => [],
  },
  Mutation: {
    send: (_, { input }, { pubSub }) => {
      const { roomId, ...newMessage } = input;
      pubSub.publish("newMessage", roomId, newMessage);
      return newMessage;
    },
  },
  Subscription: {
    newMessageTut: {
      subscribe: (_, { roomId }, { pubSub }) =>
        pubSub.subscribe("newMessage", roomId),
      resolve: (payload: MessagePayload) => payload,
    },
  },
};
