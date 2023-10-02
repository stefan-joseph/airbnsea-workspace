import { ValidationError } from "yup";
import { User } from "../../../entity/User";
import { duplicateEmail } from "./errorMessages";
import { createConfirmEmailLink } from "../../../utils/createConfirmEmailLink";
import { sendEmail } from "../../../utils/sendEmail";
import { Resolvers } from "../../../types/types";
import { registerUserSchema } from "@airbnb-clone/common";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import formatYupError from "../../shared/utils/formatYupError";

export const resolvers: Resolvers = {
  Mutation: {
    register: async (_, args, { redis }) => {
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
        select: ["id"],
      });

      if (userAlreadyExists) {
        return formatGraphQLYogaError(duplicateEmail);
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
