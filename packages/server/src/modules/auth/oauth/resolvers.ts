import axios from "axios";
import { Resolvers } from "../../../types/types";
import { Endpoints } from "@octokit/types";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { badGithubOauthRequest } from "./errorMessages";
import { User } from "../../../entity/User";
import { userSessionIdPrefix } from "../../../utils/constants";

export const resolvers: Resolvers = {
  Mutation: {
    authenticateUserWithOauth: async (_, { code }, { redis, req }) => {
      let response;
      try {
        const { data } = await axios.post(
          "https://github.com/login/oauth/access_token",
          {
            client_id: process.env.GITHUB_AUTH_CLIENT_ID,
            client_secret: process.env.GITHUB_AUTH_CLIENT_SECRET,
            code,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        response = data;
        if (response.error) {
          throw Error;
        }
      } catch {
        return formatGraphQLYogaError(badGithubOauthRequest);
      }

      let email;
      let response2;

      try {
        const { data } = await axios("https://api.github.com/user", {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });
        response2 = data;
        // what does error message look like?
      } catch {
        return formatGraphQLYogaError(badGithubOauthRequest);
      }

      console.log("response2", response2);

      email = response2.email;

      // github users email is set to private and needs to be called with more specific API endpoint

      if (!email) {
        try {
          const { data } = await axios("https://api.github.com/user/emails", {
            headers: { Authorization: `Bearer ${response.access_token}` },
          });
          const emails: Endpoints["GET /user/emails"]["response"]["data"] =
            data;
          email = emails.find((email) => email.primary)?.email;
          // what does error message look like?
        } catch {
          return formatGraphQLYogaError(badGithubOauthRequest);
        }
      }

      console.log("email", email);

      if (!email) {
        // email is needed as unique identifier for sign up
        return formatGraphQLYogaError(
          "Cannot access the email associated with your Github account. Please use an alternative sign up method."
        );
      }

      // check if user already exists in database
      const userAlreadyExists = await User.findOne({
        where: { email },
      });

      if (userAlreadyExists) {
        console.log(userAlreadyExists);
        // login now succesful
        const { id, confirmed, avatar } = userAlreadyExists;

        // user doesn't have to confirm email now
        if (!confirmed) {
          await User.update({ id }, { confirmed: true });
        }

        // grab avatar from github if user doesn't have one
        if (!avatar && response2.avatar_url) {
          await User.update({ id }, { avatar: response2.avatar_url });
        }
        //@TODO batch these ^^^

        //@TODO check forgotPasswordLocked?

        req.session.userId = id;
        if (req.sessionID) {
          await redis.lpush(`${userSessionIdPrefix}${id}`, req.sessionID);
        }
        return true;
      }

      if (!response2.name) {
        // name is required for all airbnsea users
        return formatGraphQLYogaError(
          "You do not have a name asscoiated with your Github account. Please add one or use an alternative method to sign up."
        );
      }

      // if no, add new user to database (name, avatarImg, confirmed: true) and sign in user

      // res.redirect(process.env.FRONTEND_HOST as string);
      return true;
    },
  },
};
