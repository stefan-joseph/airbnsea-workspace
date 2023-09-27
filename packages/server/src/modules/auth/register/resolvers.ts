import * as yup from "yup";
import { User } from "../../../entity/User";
import { formatYupError } from "../../../utils/formatYupError";
import { duplicateEmail } from "./utils/errorMessages";
import { createConfirmEmailLink } from "../../../utils/createConfirmEmailLink";
import { sendEmail } from "../../../utils/sendEmail";
import { Resolvers } from "../../../types/types";
import { registerUserSchema } from "@airbnb-clone/common";

export const resolvers: Resolvers = {
  Mutation: {
    register: async (_, args, { redis }) => {
      const { email, password } = args;

      // yup validation
      try {
        await registerUserSchema.validate(args, { abortEarly: false });
      } catch (error) {
        const errors = formatYupError(error as yup.ValidationError);
        return errors;
      }

      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"],
      });

      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: duplicateEmail,
          },
        ];
      }

      const user = User.create({
        email,
        password,
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

      return null;
    },
  },
};
