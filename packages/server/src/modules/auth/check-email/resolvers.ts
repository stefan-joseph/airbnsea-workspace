import { ValidationError } from "yup";
import { User } from "../../../entity/User";
import { Resolvers } from "../../../types/types";
import { checkEmailSchema } from "@airbnb-clone/common";
import formatYupError from "../../shared/utils/formatYupError";
import { createConfirmEmailLink } from "../../../utils/createConfirmEmailLink";
import { sendEmail } from "../../../utils/sendEmail";

export const resolvers: Resolvers = {
  Query: {
    checkEmail: async (_, { email }, { redis }) => {
      // yup validation
      try {
        await checkEmailSchema.validate({ email });
      } catch (error) {
        return {
          __typename: "ValidationError",
          ...formatYupError(error as ValidationError),
        };
      }

      const user = await User.findOne({
        where: { email: email.toLowerCase() },
      });

      if (user) {
        const { email, firstName, avatar, authorizationServer, confirmed } =
          user;

        // if user email not confirmed, must do this first
        if (!confirmed) {
          const url = await createConfirmEmailLink(
            process.env.FRONTEND_HOST as string,
            user.id,
            redis
          );
          console.log(email);
          if (process.env.NODE_ENV !== "test") {
            // resend confirmation email
            await sendEmail(email, url, "Click here to confirm your email");
          }

          return {
            __typename: "UserNotConfirmed",
            email,
            userExists: true,
          };
        }
        console.log(email);
        // if user has password, they should sign in with it
        if (user.password) {
          return {
            __typename: "UserExistsWithPassword",
            email,
            userExists: true,
          };
        }
        console.log(email);

        // otherwise user must be oAuth
        return {
          __typename: "UserExistsWithOAuth",
          authorizationServer,
          email,
          firstName,
          avatar,
        };
      }

      // email does not exist in db, continue to finish sign up process
      return { __typename: "NoUserWithThisEmail", email, userExists: false };
    },
  },
};
