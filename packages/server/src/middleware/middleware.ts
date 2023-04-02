import { formatGraphQLYogaError } from "../modules/shared/utils/formatGraphQLYogaError";
import validate = require("uuid-validate");
import { formatBadUuidErrorMessage } from "../modules/shared/utils/errorMessages";

const isAuthenticated = async (
  resolve: any,
  root: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.req.session.userId) {
    return formatGraphQLYogaError("Please log in to use this service");
  }
  return resolve(root, args, context, info);
};

export const authMiddleware = {
  Mutation: {
    createListing: isAuthenticated,
    deleteListing: isAuthenticated,

    createBooking: isAuthenticated,

    createConversation: isAuthenticated,
    createMessage: isAuthenticated,
  },
  Query: {
    me: isAuthenticated,

    populateInbox: isAuthenticated,
    populateConversation: isAuthenticated,
    // populateConversationWithGuest: isAuthenticated,
  },
  Subscription: { newMessage: isAuthenticated },
};

export const isValidUuid = async (
  resolve: any,
  root: any,
  args: any,
  context: any,
  info: any
) => {
  const id = Object.keys(args).find((key) => key.includes("Id"));

  // typecast ok: id will have to be present otherwise graphql will throw error on request
  if (!validate(args[id as string])) {
    return formatGraphQLYogaError(formatBadUuidErrorMessage(id as string));
  }

  return resolve(root, args, context, info);
};

export const listingIdMiddleware = {
  Mutation: {
    createConversation: isValidUuid,
    createMessage: isValidUuid,

    createBooking: isValidUuid,
  },
  Query: {
    populateConversation: isValidUuid,
    // populateConversationWithGuest: isValidUuid,
  },
  Subscription: { newMessage: isValidUuid },
};
