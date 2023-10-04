import { ValidationError } from "yup";
import { User } from "../../../entity/User";
import { createConfirmEmailLink } from "../../../utils/createConfirmEmailLink";
import { sendEmail } from "../../../utils/sendEmail";
import { Resolvers } from "../../../types/types";
import { registerUserSchema } from "@airbnb-clone/common";
import formatYupError from "../../shared/utils/formatYupError";
import { compare } from "bcryptjs";
import { userSessionIdPrefix } from "../../../utils/constants";

export const resolvers: Resolvers = {
  Mutation: {
    register: async (_, args, { redis, req }) => {
      const { email, password, firstName } = args;

      // yup validation
      try {
        await registerUserSchema.validate(args);
      } catch (error) {
        return {
          __typename: "ValidationError",
          ...formatYupError(error as ValidationError),
        };
      }

      const userAlreadyExists = await User.findOne({
        where: { email },
      });

      if (userAlreadyExists) {
        // only happens if user changes email between check-email and register auth flow screens
        // otherwise check-email will redirect to appropriate auth flow screen
        const { oAuth, firstName, avatar } = userAlreadyExists;
        if (oAuth) {
          // already existing user can sign in with oauth
          return {
            __typename: "EmailExistsWithOAuth",
            authorizationServer: oAuth,
            email,
            firstName,
            avatar,
          };
        }

        // check submitted password

        const validPassword = await compare(
          password,
          userAlreadyExists.password as string
        );

        if (validPassword) {
          // login now succesful
          req.session.userId = userAlreadyExists.id;
          if (req.sessionID) {
            await redis.lpush(
              `${userSessionIdPrefix}${userAlreadyExists.id}`,
              req.sessionID
            );
          }
          // user will be logged in because
          // registration email and password match existing user

          return {
            __typename: "UserLogin",
            success: true,
          };
        } else {
          // already existing user needs to input correct password
          return {
            __typename: "EmailExistsWithIncorrectPassword",
            email,
            firstName,
            avatar,
          };
        }
      }

      const user = User.create({
        email,
        password,
        firstName,
      });

      await user.save();

      const url = await createConfirmEmailLink(
        process.env.FRONTEND_HOST as string,
        user.id,
        redis
      );

      if (process.env.NODE_ENV !== "test") {
        await sendEmail(email, url, "Click here to confirm your email");
      }

      return { __typename: "SuccessResponse", success: true };
    },
  },
};
