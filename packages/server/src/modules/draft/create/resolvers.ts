import { Draft } from "../../../entity/Draft";
import { Resolvers } from "../../../types/types";

export const resolvers: Resolvers = {
  Mutation: {
    createListing: async (
      _,
      { input: { vesselType } },
      { req: { session } }
    ) => {
      const listing = await Draft.create({
        vesselType,
        userId: session.userId,
      }).save();

      return listing.id;
    },
  },
};
