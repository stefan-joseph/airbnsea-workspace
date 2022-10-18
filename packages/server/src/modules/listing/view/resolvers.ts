import { Listing } from "../../../entity/Listing";

// import { User } from "../../../entity/User";
import { Resolvers } from "../../../types/types";

export const resolvers: Resolvers = {
  Query: {
    viewListing: (_, { id }) => Listing.findOneBy({ id }),
  },
};
