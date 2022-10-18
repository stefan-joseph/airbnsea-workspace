import { Listing } from "../../../entity/Listing";
import { Resolvers } from "../../../types/types";
// import { isAuthenticated } from "../../shared/isAuthenticated";

export const resolvers: Resolvers = {
  Mutation: {
    deleteListing: async (_, { id }, { session }) => {
      const listing = await Listing.findOne({ where: { id } });

      if (!listing) {
        throw new Error("does not exist");
      }

      if (listing.userId !== session.userId) {
        console.log(
          `user: ${session.userId} is trying to delete a listing that is not theirs`
        );
        throw new Error("not authorized");
      }

      await Listing.remove(listing);

      return true;
    },
  },
};
