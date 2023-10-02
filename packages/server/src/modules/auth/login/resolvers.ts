import { ValidationError } from "yup";
import { compare } from "bcryptjs";
import { loginSchema } from "@airbnb-clone/common";

import { User } from "../../../entity/User";
import { Resolvers } from "../../../types/types";
import { confirmEmailError, invalidCredentails } from "./errorMessages";
import { userSessionIdPrefix } from "../../../utils/constants";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import formatYupError from "../../shared/utils/formatYupError";

export const resolvers: Resolvers = {
  Mutation: {
    login: async (_, args, { redis, req }) => {
      try {
        // yup validation
        await loginSchema.validate(args);
      } catch (error) {
        return {
          __typename: "ValidationError",
          ...formatYupError(error as ValidationError),
        };
      }

      const { email, password } = args;

      const user = await User.findOne({
        where: { email: email.toLowerCase() },
      });

      if (!user) {
        return formatGraphQLYogaError(invalidCredentails);
      }

      if (!user.confirmed) {
        return formatGraphQLYogaError(confirmEmailError);
      }

      const validPassword = await compare(password, user.password as string);
      if (!validPassword) {
        return formatGraphQLYogaError(invalidCredentails);
      }

      // login now succesful
      req.session.userId = user.id;
      if (req.sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
      }

      return { __typename: "SuccessResponse", success: true };
    },
  },
};
