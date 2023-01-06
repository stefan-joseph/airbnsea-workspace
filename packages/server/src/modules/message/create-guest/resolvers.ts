import { Listing } from "../../../entity/Listing";
import { Message } from "../../../entity/Message";
import { Resolvers } from "../../../types/types";
import { formatNoListingErrorMessage } from "../../shared/utils/errorMessages";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
// import { PUBSUB_NEW_MESSAGE } from "../shared/constants";

export const resolvers: Resolvers = {
  Mutation: {
    createGuestMessage: async (
      _,
      { listingId, text },
      {
        req: {
          session: { userId },
        },
        pubSub,
      }
    ) => {
      // first check if listing exists
      const listing = await Listing.findOne({
        where: {
          id: listingId,
        },
      });
      console.log(listing);

      if (!listing) {
        return formatGraphQLYogaError(formatNoListingErrorMessage(listingId));
      }

      const dbMessage = await Message.create({
        text,
        listingId,
        userId,
      }).save();

      console.log("dbMessage", dbMessage);

      pubSub.publish("newMessage", {
        newMessage: dbMessage,
      });

      return true;
    },
  },
};
