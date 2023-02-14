import { messageSchema } from "@airbnb-clone/common";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "yup";

import { Listing } from "../../../entity/Listing";
import { Message } from "../../../entity/Message";
import { Resolvers } from "../../../types/types";
import { formatNoListingErrorMessage } from "../../shared/utils/errorMessages";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { formatYupError } from "../../shared/utils/formatYupError";
import { cannotMessageOwnListing } from "./utils/errorMessages";

export const resolvers: Resolvers = {
  Mutation: {
    createMessage: async (_, args, { req: { session }, pubSub }) => {
      const { listingId, text } = args;
      const listing = await Listing.findOne({ where: { id: listingId } });

      if (!listing) {
        return formatGraphQLYogaError(formatNoListingErrorMessage(listingId));
      }

      try {
        await messageSchema.validate(args);
      } catch (error) {
        return formatYupError(error as ValidationError);
      }

      const userIdOfHost: string = listing.userId;

      const conversationAlreadyExists = await Message.findOne({
        where: [
          {
            listingId,
            userIdOfGuest: session.userId,
          },
          {
            listingId,
            userIdOfHost: session.userId,
          },
        ],
      });

      if (!conversationAlreadyExists) {
        if (userIdOfHost === session.userId) {
          return formatGraphQLYogaError(cannotMessageOwnListing);
        }
      }

      let fromHost: boolean = false;
      let userIdOfGuest: string = session.userId;
      let conversationId: string = uuidv4();

      if (conversationAlreadyExists) {
        conversationId = conversationAlreadyExists.conversationId;
        if (userIdOfHost === session.userId) {
          fromHost = true;
          userIdOfGuest = conversationAlreadyExists.userIdOfGuest;
        }
      }

      const dbMessage = await Message.create({
        text,
        fromHost,
        userIdOfGuest,
        userIdOfHost,
        listingId,
        conversationId,
      }).save();

      await pubSub.publish("newMessage", {
        newMessage: dbMessage,
      });

      return dbMessage.conversationId;
    },
  },
};
