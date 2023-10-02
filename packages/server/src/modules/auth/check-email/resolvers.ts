import { ValidationError } from "yup";
import { User } from "../../../entity/User";
import { Resolvers } from "../../../types/types";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { checkEmailSchema } from "@airbnb-clone/common";
import formatYupError from "../../shared/utils/formatYupError";

export const resolvers: Resolvers = {
  Query: {
    checkEmail: async (_, { email }) => {
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
        // check if user is confirmed
        if (!user.confirmed) {
          return formatGraphQLYogaError("Your email has not been confirmed");
        }

        const { email, firstName, avatar, oAuth } = user;
        if (user.password) {
          // if user has password, they must sign in with it
          return {
            __typename: "EmailExistsWithPassword",
            email,
            userExists: true,
          };
        }

        // otherwise user must be oAuth
        return {
          __typename: "EmailExistsWithOAuth",
          authorizationServer: oAuth,
          email,
          firstName,
          avatar,
        };
      }

      // if (!user.confirmed) {
      //   return {
      //     errors: [
      //       {
      //         path: "email",
      //         message: confirmEmailError,
      //       },
      //     ],
      //   };
      // }

      // if (user.forgotPasswordLocked) {
      //   return {
      //     errors: [
      //       {
      //         path: "email",
      //         message: forgotPasswordLockedError,
      //       },
      //     ],
      //   };
      // }

      // email does not exist in db, continue to finish sign up process
      return { __typename: "NoUserWithThisEmail", email, userExists: false };
    },
  },
};
