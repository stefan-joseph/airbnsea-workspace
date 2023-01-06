import { User } from "../../../entity/User";
import { compare } from "bcryptjs";
import { Resolvers } from "../../../types/types";
import {
  confirmEmailError,
  forgotPasswordLockedError,
  invalidLogin,
} from "./errorMessages";
import { userSessionIdPrefix } from "../../../utils/constants";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin,
  },
];

export const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }, { redis, req }) => {
      let user;
      if (email) {
        user = await User.findOne({ where: { email } });
      }

      if (!user) {
        return { errors: errorResponse };
      }

      if (!user.confirmed) {
        return {
          errors: [
            {
              path: "email",
              message: confirmEmailError,
            },
          ],
        };
      }

      if (user.forgotPasswordLocked) {
        return {
          errors: [
            {
              path: "email",
              message: forgotPasswordLockedError,
            },
          ],
        };
      }

      const validPassword = await compare(password, user.password as string);
      if (!validPassword) {
        return { errors: errorResponse };
      }
      console.log(req.session);

      // login now succesful
      req.session.userId = user.id;
      if (req.sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
      }

      return { sessionId: req.sessionID };
    },
  },
};
