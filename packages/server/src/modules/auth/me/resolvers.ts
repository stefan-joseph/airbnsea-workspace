import { User } from "../../../entity/User";
import { Resolvers } from "../../../types/types";

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { session }) => {
      if (session.userId) {
        const user = await User.findOne({
          where: { id: session.userId },
        });
        if (user) return true;
      }
      return false;
    },
  },
};
