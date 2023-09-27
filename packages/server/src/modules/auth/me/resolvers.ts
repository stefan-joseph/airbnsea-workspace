import { User } from "../../../entity/User";
import { Resolvers } from "../../../types/types";

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { req }) =>
      User.findOne({
        where: { id: req.session.userId },
      }),
  },
};
