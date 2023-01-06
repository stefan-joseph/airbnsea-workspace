import { Listing } from "../../../entity/Listing";
import { Message } from "../../../entity/Message";
import { Resolvers } from "../../../types/types";

export const resolvers: Resolvers = {
  Message: {
    user: ({ userId }, _, { userLoader }) => userLoader.load(userId),
    userId: () => null, // don't return userId to client
  },
  Query: {
    populateInbox: async (
      _,
      { type },
      {
        req: {
          session: { userId },
        },
      }
    ) => {
      if (type === "guest") {
        const messages = Message.find({
          where: { userId },
        });
        console.log(messages);
        // get only most recent message and interlocutor details
      } else {
        // find listings that are owned by userId
        const listings = Listing.find({
          where: {
            userId,
          },
          // select only listingId
        });
        console.log(listings);

        // find messages associated with any of the above listingId
        const messages = Message.find({
          where: { userId },
        });
        console.log(messages);

        // get only most recent message and interlocutor details
      }
      return [];
    },
  },
};
