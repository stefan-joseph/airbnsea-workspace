import * as yup from "yup";
import { User } from "../../../entity/User";
import { Resolvers } from "../../../types/types";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { checkEmailSchema } from "@airbnb-clone/common";
// import { formatYupError } from "../../shared/utils/formatYupError";
// import { GraphQLError } from "graphql";

export const resolvers: Resolvers = {
  Query: {
    checkEmail: async (_, { email }) => {
      // yup validation
      try {
        await checkEmailSchema.validate({ email }, { abortEarly: false });
      } catch (error) {
        // return Promise.reject(new GraphQLError("baby"));
        // console.log("error", error);
        // const errors = formatYupError(error as yup.ValidationError);
        // console.log("errors", errors);
        const formatYupError = (error: yup.ValidationError) => {
          const { message, path } = error.inner[0];
          return { message, field: path as string };
        };
        return {
          __typename: "BadCredentialsError",
          ...formatYupError(error as yup.ValidationError),
        };
      }

      const user = await User.findOne({
        where: { email: email.toLowerCase() },
      });

      let userExists = false;

      if (user) {
        userExists = true;

        // check if user is confirmed
        if (!user.confirmed) {
          return formatGraphQLYogaError("Your email has not been confirmed");
        }

        if (user.password) {
          // if user has password, they must sign in with it
          return { userExists };
        }
        // otherwise user must be oAuth
        const { email, firstName, avatar, oAuth } = user;
        return {
          userExists,
          oAuth: {
            authorizationServer: oAuth,
            emailReminder: email,
            firstName,
            avatar,
          },
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

      // login now succesful

      return { userExists };
    },
  },
};
