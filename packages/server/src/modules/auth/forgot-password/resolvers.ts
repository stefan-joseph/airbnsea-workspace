import { User } from "../../../entity/User";
import { hash } from "bcryptjs";
import { Resolvers } from "../../../types/types";
import { forgotPasswordPrefix } from "../../../utils/constants";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { expiredKeyError } from "./errorMessages";
import { ValidationError } from "yup";

import { sendEmail } from "../../../utils/sendEmail";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  // resetPasswordSchema,
} from "@airbnb-clone/common";
import { removeAllOfUsersSessions } from "../../../utils/removeAllOfUsersSessions";
import formatYupError from "../../shared/utils/formatYupError";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";

export const resolvers: Resolvers = {
  Mutation: {
    sendForgotPasswordEmail: async (_, args, { redis }) => {
      const { email } = args;

      // yup validation
      try {
        await forgotPasswordSchema.validate(args);
      } catch (error) {
        return {
          __typename: "ValidationError",
          ...formatYupError(error as ValidationError),
        };
      }

      const user = await User.findOne({
        where: { email: email.toLowerCase() },
      });

      if (!user) {
        return formatGraphQLYogaError(
          `No account exists for ${email}. Maybe you signed up using a different/incorrect email address.`
        );
      }

      // remove all sessions
      await removeAllOfUsersSessions(user.id, redis);

      const url = await createForgotPasswordLink(
        process.env.FRONTEND_HOST as string,
        user.id,
        redis
      );

      await sendEmail(email, url, "Click here to reset your password");

      return { __typename: "ForgotPasswordEmailSuccessResponse", email };
    },

    resetPassword: async (_, args, { redis }) => {
      const { newPassword, key } = args;

      const redisKey = `${forgotPasswordPrefix}${key}`;

      const userId = await redis.get(redisKey);

      if (!userId) {
        return formatGraphQLYogaError(expiredKeyError);
      }

      // yup validation
      try {
        await resetPasswordSchema.validate(args);
      } catch (error) {
        return {
          __typename: "ValidationError",
          ...formatYupError(error as ValidationError),
        };
      }

      const hashedPassword = await hash(newPassword, 10);

      const updateUserPromise = User.update(
        { id: userId },
        {
          password: hashedPassword,
        }
      );

      const deleteKeyPromise = redis.del(redisKey);

      await Promise.all([updateUserPromise, deleteKeyPromise]);

      return { __typename: "SuccessResponse", success: true };
    },
  },
};
