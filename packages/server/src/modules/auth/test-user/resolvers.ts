import { User } from "../../../entity/User";
import { Resolvers } from "../../../types/types";
import { userSessionIdPrefix } from "../../../utils/constants";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";

export const resolvers: Resolvers = {
  Mutation: {
    loginAsRandomUser: async (_, __, { redis, req }) => {
      const users = await User.find({ where: {} });
      if (!users) {
        return formatGraphQLYogaError(
          "A random user could not be found at this time."
        );
      }

      const randomUser = users[Math.floor(Math.random() * users.length)];

      // login now succesful
      req.session.userId = randomUser.id;
      if (req.sessionID) {
        await redis.lpush(
          `${userSessionIdPrefix}${randomUser.id}`,
          req.sessionID
        );
      }

      return true;
    },
  },
};
