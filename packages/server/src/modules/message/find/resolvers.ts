import { Message } from "../../../entity/Message";
import { Resolvers } from "../../../types/types";

export const resolvers: Resolvers = {
  Message: {
    user: ({ userId }, _, { userLoader }) => userLoader.load(userId),
    userId: () => null, // don't return userId to client
  },
  Query: {
    messages: async (_, { listingId }, { req: { session } }) =>
      Message.find({
        where: { listingId, userId: session.userId },
      }),
  },
};
