import { User } from "../../../entity/User";
import { hash } from "bcryptjs";
import { Resolvers } from "../../../types/types";
import { forgotPasswordPrefix } from "../../../utils/constants";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { expiredKeyError } from "./errorMessages";
import * as yup from "yup";
import { formatYupError } from "../../../utils/formatYupError";
import { sendEmail } from "../../../utils/sendEmail";
import { resetPasswordSchema } from "@airbnb-clone/common";
import { removeAllOfUsersSessions } from "../../../utils/removeAllOfUsersSessions";

export const resolvers: Resolvers = {
  Mutation: {
    sendForgotPasswordEmail: async (_, { email }, { redis }) => {
      if (!email) return true; // 'undefined' email will still return first user in db
      const user = await User.findOne({
        where: { email: email.toLowerCase() },
      });
      if (!user) return true;
      // if no user with inputted email then return same response so as
      // to not concede whether that email is associeted with a user

      // remove all sessions
      await removeAllOfUsersSessions(user.id, redis);

      const url = await createForgotPasswordLink(
        process.env.FRONTEND_HOST as string,
        user.id,
        redis
      );

      await sendEmail(email, url, "Click here to reset your password");

      return true;
    },

    resetPassword: async (_, { newPassword, key }, { redis }) => {
      const redisKey = `${forgotPasswordPrefix}${key}`;
      const userId = await redis.get(redisKey);
      if (!userId) {
        return [
          {
            path: "newPassword",
            message: expiredKeyError,
          },
        ];
      }

      try {
        await resetPasswordSchema.validate(
          { newPassword },
          { abortEarly: false }
        );
      } catch (error) {
        return formatYupError(error as yup.ValidationError);
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

      return null;
    },
  },
};
