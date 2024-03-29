import { Listing } from "../../../entity/Listing";
import { Resolvers } from "../../../types/types";
import { formatNotFoundWithGivenIdErrorMessage } from "../../shared/utils/errorMessages";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { imageUrl } from "../../shared/utils/constants";

export const resolvers: Resolvers = {
  Listing: {
    photos: ({ photos }) => photos.map((url) => imageUrl + url),
    owner: async ({ userId }, _, { userLoader }) => userLoader.load(userId),
    userId: () => null, // not for client but needed for owner db call
  },
  Query: {
    viewListing: async (_, { listingId }) => {
      const listing = await Listing.findOneBy({ id: listingId });
      if (!listing) {
        return formatGraphQLYogaError(
          formatNotFoundWithGivenIdErrorMessage("listing", listingId)
        );
      }
      return listing;
    },
  },
};
