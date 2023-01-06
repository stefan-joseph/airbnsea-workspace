import { User } from "../../../entity/User";
import { Resolvers } from "../../../types/types";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
// import { GraphQLError } from "graphql";

export const resolvers: Resolvers = {
  Query: {
    getRandomUserCredentails: async () => {
      const user = await User.findOne({ where: {} });
      if (!user) {
        return formatGraphQLYogaError(
          "A random user could not be found at this time."
        );
      }

      return {
        email: user.email,
        password: "secret",
      };
    },
  },
};
