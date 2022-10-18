import { Resolvers } from "../../../types/types";
import { pipe, filter } from "@graphql-yoga/node";

export const resolvers: Resolvers = {
  Subscription: {
    newMessage: {
      subscribe: (_, { listingId }, { pubSub }) =>
        pipe(
          pubSub.asyncIterator("newMessage"),
          filter(({ newMessage }) => newMessage.listingId === listingId)
        ),

      resolve: (payload: any) => {
        console.log("payload", payload);

        return payload.newMessage;
      },
    },
  },
};
