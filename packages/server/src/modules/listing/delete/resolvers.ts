import { Listing } from "../../../entity/Listing";
import { Resolvers } from "../../../types/types";
// import { isAuthenticated } from "../../shared/isAuthenticated";

export const resolvers: Resolvers = {
  Mutation: {
    deleteListing: async (_, { id }, { req: { session } }) => {
      const listing = await Listing.findOne({ where: { id } });

      if (!listing) {
        throw new Error("does not exist");
      }

      if (listing.userId !== session.userId) {
        throw new Error("not authorized");
      }

      await Listing.remove(listing);

      return true;
    },
  },
};
