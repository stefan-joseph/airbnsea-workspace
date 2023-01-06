import { Draft } from "../../../entity/Draft";
import { Resolvers } from "../../../types/types";
import { getTypeormConnection } from "../../../utils/getTypeormConnection";

export const resolvers: Resolvers = {
  Draft: {
    photos: ({ photos }) =>
      photos.map(
        (url) => "https://res.cloudinary.com/stefandevelops/image/upload/" + url
      ),
  },
  Query: {
    populateForm: async (_, { listingId, fields }) => {
      let select: string[] = ["draft.id"];
      fields.forEach((field) => select.push(`draft.${field}`));

      let typeormConnection = getTypeormConnection();
      const listing = await typeormConnection
        .getRepository(Draft)
        .createQueryBuilder("draft")
        .where("draft.id = :id", { id: listingId })
        .select(select)
        .getOneOrFail();

      return listing;
    },
  },
};
