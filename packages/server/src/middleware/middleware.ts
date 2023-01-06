import { formatGraphQLYogaError } from "../modules/shared/utils/formatGraphQLYogaError";

export const isAuthenticated = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.req.session.userId) {
    return formatGraphQLYogaError(`Please log in to use this service`);
  }
  return resolve(parent, args, context, info);
};

export const middleware = {
  Mutation: {
    createListing: isAuthenticated,
    deleteListing: isAuthenticated,

    createBooking: isAuthenticated,

    createGuestMessage: isAuthenticated,
    createHostMessage: isAuthenticated,
  },
  Query: {
    me: isAuthenticated,
  },
};
