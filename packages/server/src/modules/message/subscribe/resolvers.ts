import { Resolvers } from "../../../types/types";
import { pipe, filter } from "@graphql-yoga/node";

export const resolvers: Resolvers = {
  Subscription: {
    newMessage: {
      subscribe: (_, { conversationId }, { pubSub }) =>
        pipe(
          pubSub.subscribe("newMessage"),
          filter(
            ({ newMessage }) => newMessage.conversationId === conversationId
          )
        ),

      resolve: (payload: any) => {
        console.log("payload", payload.newMessage);

        return payload.newMessage;
      },
    },
  },
};
