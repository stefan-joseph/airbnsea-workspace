import { Listing } from "../../../entity/Listing";
import { Message } from "../../../entity/Message";
import { Resolvers } from "../../../types/types";
import { imageUrl } from "../../shared/utils/constants";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";

export const resolvers: Resolvers = {
  Conversation: {
    listing: async ({ listingId }) => {
      const listing = await Listing.findOneBy({ id: listingId });
      if (!listing) return null;
      return { name: listing.name, img: imageUrl + listing.photos[0] };
    },
    interlocutor: ({ interlocutorId }, _, { userLoader }) =>
      userLoader.load(interlocutorId),
    interlocutorId: () => null, // don't return any userId's to client
  },

  Query: {
    populateConversationWithHost: async (
      _,
      { conversationId },
      {
        req: {
          session: { userId },
        },
      }
    ) => {
      const messages = await Message.find({
        where: { userIdOfGuest: userId, conversationId },
        order: { createdDate: "ASC" },
      });

      if (messages.length < 1) {
        return formatGraphQLYogaError(
          "No existing conversation with this listing"
        );
      }

      return {
        interlocutorId: messages[0].userIdOfHost,
        listingId: messages[0].listingId,
        conversationId,
        messages,
      };
    },
    populateConversationWithGuest: async (
      _,
      { conversationId },
      {
        req: {
          session: { userId },
        },
      }
    ) => {
      const messages = await Message.find({
        where: { userIdOfHost: userId, conversationId },
        order: { createdDate: "ASC" },
      });

      if (messages.length < 1) {
        return formatGraphQLYogaError(
          "No existing conversation with this listing"
        );
      }

      return {
        interlocutorId: messages[0].userIdOfGuest,
        listingId: messages[0].listingId,
        conversationId,
        messages,
      };
    },
  },
};
