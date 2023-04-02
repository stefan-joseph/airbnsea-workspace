import { messageSchema } from "@airbnb-clone/common";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "yup";

import { Listing } from "../../../entity/Listing";
import { Message } from "../../../entity/Message";
import { Resolvers } from "../../../types/types";
import { formatNotFoundWithGivenIdErrorMessage } from "../../shared/utils/errorMessages";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { formatYupError } from "../../shared/utils/formatYupError";
import { cannotStartConversationWithOwnListing } from "./utils/errorMessages";

export const resolvers: Resolvers = {
  Mutation: {
    createConversation: async (
      _,
      args,
      {
        req: {
          session: { userId },
        },
        pubSub,
      }
    ) => {
      const { listingId, text } = args;

      const listing = await Listing.findOne({ where: { id: listingId } });

      if (!listing) {
        return formatGraphQLYogaError(
          formatNotFoundWithGivenIdErrorMessage("listing", listingId)
        );
      }

      if (listing.userId === userId) {
        return formatGraphQLYogaError(cannotStartConversationWithOwnListing);
      }

      try {
        await messageSchema.validate(args);
      } catch (error) {
        return formatYupError(error as ValidationError);
      }

      const existingConversation = await Message.findOne({
        where: { listingId, userIdOfGuest: userId },
      });

      if (existingConversation) {
        return {
          __typename: "Redirect",
          redirect:
            (process.env.FRONTEND_HOST as string) +
            `/inbox/${existingConversation.conversationId}?text=${text}`,
        };
      } else {
        const conversationId = uuidv4();

        const dbMessage = await Message.create({
          text,
          fromHost: false,
          userIdOfGuest: userId,
          userIdOfHost: listing.userId,
          listingId,
          conversationId,
        }).save();

        await pubSub.publish("newMessage", dbMessage.conversationId, {
          ...dbMessage,
        });

        return {
          __typename: "ConversationId",
          conversationId: dbMessage.conversationId,
        };
      }
    },
  },
};
