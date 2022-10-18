import { Listing } from "../../../entity/Listing";

// import { User } from "../../../entity/User";
import { Resolvers } from "../../../types/types";

export const resolvers: Resolvers = {
  Listing: {
    imgUrl: (parent) =>
      parent.imgUrl && `http://localhost:4001/images/${parent.imgUrl}`,
    owner: async ({ userId }, _, { userLoader }) => userLoader.load(userId),
    userId: () => null, // not for client but needed for owner db call
  },
  Query: {
    findListings: async () => {
      return Listing.find();
    },
  },
};
