import { messageSchema } from "@airbnb-clone/common";
import { ValidationError } from "yup";

import { Message } from "../../../entity/Message";
import { Resolvers } from "../../../types/types";
import { formatNotFoundWithGivenIdErrorMessage } from "../../shared/utils/errorMessages";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { formatYupError } from "../../shared/utils/formatYupError";
import { noPermissionToParticipateInConversationErrorMessage } from "./utils/errorMessages";

export const resolvers: Resolvers = {
  Mutation: {
    createMessage: async (
      _,
      args,
      {
        req: {
          session: { userId },
        },
        pubSub,
      }
    ) => {
      const { conversationId, text } = args;

      const existingConversation = await Message.findOne({
        where: { conversationId },
      });

      if (!existingConversation) {
        return formatGraphQLYogaError(
          formatNotFoundWithGivenIdErrorMessage("conversation", conversationId)
        );
      }
      const {
        listingId: existingListingId,
        userIdOfGuest,
        userIdOfHost,
      } = existingConversation;

      if (userId !== userIdOfGuest && userId !== userIdOfHost) {
        return formatGraphQLYogaError(
          noPermissionToParticipateInConversationErrorMessage
        );
      }

      try {
        await messageSchema.validate(args);
      } catch (error) {
        return formatYupError(error as ValidationError);
      }

      const fromHost = userId === userIdOfHost ? true : false;

      const dbMessage = await Message.create({
        text,
        fromHost,
        userIdOfGuest,
        userIdOfHost,
        listingId: existingListingId,
        conversationId,
      }).save();

      // Promise All()

      await pubSub.publish("newMessage", conversationId, { ...dbMessage });
      //
      await pubSub.publish("newMessage", userIdOfGuest, { ...dbMessage });
      await pubSub.publish("newMessage", userIdOfHost, { ...dbMessage });

      return dbMessage.conversationId;
    },
  },
};
