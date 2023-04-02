import { Resolvers } from "../../../types/types";
import { removeAllOfUsersSessions } from "../../../utils/removeAllOfUsersSessions";

export const resolvers: Resolvers = {
  Mutation: {
    logout: async (_, __, { req: { session }, redis, res }) => {
      console.log(session.userId);

      const { userId } = session;

      if (userId) {
        await removeAllOfUsersSessions(userId, redis);
        res.clearCookie("qid");
        return true;
      }
      return false;
    },
  },
};
