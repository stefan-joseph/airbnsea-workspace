import { Listing } from "../../../entity/Listing";
import { Message } from "../../../entity/Message";
import { User } from "../../../entity/User";
import { Resolvers } from "../../../types/types";
import { formatNoListingErrorMessage } from "../../shared/utils/errorMessages";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
// import { PUBSUB_NEW_MESSAGE } from "../shared/constants";

export const resolvers: Resolvers = {
  Mutation: {
    createHostMessage: async (
      _,
      { interlocutorId, listingId, text },
      {
        req: {
          session: { userId },
        },
        pubSub,
      }
    ) => {
      // check if listing exists and current user is the owner
      const listing = await Listing.findOne({
        where: {
          id: listingId,
        },
      });
      console.log(listing);

      if (!listing) {
        return formatGraphQLYogaError(formatNoListingErrorMessage(listingId));
      }

      if (listing.userId !== userId) {
        return formatGraphQLYogaError(
          "You do not have permission to send messages associated with this listing"
        );
      }

      // check if user exists

      const user = await User.findOne({
        where: { id: interlocutorId },
      });
      console.log(user);

      if (!user) {
        return formatGraphQLYogaError(`No user with id: ${interlocutorId}`);
      }

      const dbMessage = await Message.create({
        text,
        listingId,
        userId: interlocutorId,
      }).save();

      console.log("dbMessage", dbMessage);

      pubSub.publish("newMessage", {
        newMessage: dbMessage,
      });

      return true;
    },
  },
};
