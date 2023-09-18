import { Message } from "../../../entity/Message";
import {
  ConversationMessage,
  InboxMessage,
  Resolvers,
} from "../../../types/types";
import validate = require("uuid-validate");
import {
  formatBadUuidErrorMessage,
  unauthenticatedErrorMessage,
} from "../../shared/utils/errorMessages";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";

export const resolvers: Resolvers = {
  Subscription: {
    newMessage: {
      subscribe: async (
        _,
        { conversationId },
        {
          req: {
            session: { userId },
          },
          pubSub,
        }
      ) => {
        if (!validate(conversationId))
          return formatGraphQLYogaError(
            formatBadUuidErrorMessage(Object.keys({ conversationId })[0]) // change variable name to string
          );

        if (!validate(userId))
          return formatGraphQLYogaError(unauthenticatedErrorMessage);

        const message = await Message.findOne({
          where: [
            { conversationId, userIdOfGuest: userId },
            { conversationId, userIdOfHost: userId },
          ],
        });

        if (!message)
          return formatGraphQLYogaError(
            "You do not have permission to view this conversation"
          );
        return pubSub.subscribe("newMessage", conversationId);
      },
      resolve: (payload: ConversationMessage) => {
        return payload;
      },
    },
    updateInbox: {
      subscribe: async (
        _,
        __,
        {
          req: {
            session: { userId },
          },
          pubSub,
        }
      ) => {
        if (!validate(userId))
          return formatGraphQLYogaError(unauthenticatedErrorMessage);

        return pubSub.subscribe("newMessage", userId);
      },
      resolve: (payload: InboxMessage) => {
        return payload;
      },
    },
  },
};
