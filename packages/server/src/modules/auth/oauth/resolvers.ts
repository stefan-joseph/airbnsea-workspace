import axios from "axios";
// import * as yup from "yup";
import { AuthorizationServer, Resolvers } from "../../../types/types";
import { Endpoints } from "@octokit/types";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { badGithubOauthRequest } from "./errorMessages";
import { User } from "../../../entity/User";
import { userSessionIdPrefix } from "../../../utils/constants";
import { registerOAuthUserSchema } from "@airbnb-clone/common";

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
          console.log("error", response.error);
          return formatGraphQLYogaError(response.error.message);
        }
      } catch {
        return formatGraphQLYogaError(badGithubOauthRequest);
      }

      let email;
      let response2: Endpoints["GET /user"]["response"]["data"];

      try {
        const { data } = await axios("https://api.github.com/user", {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });

        response2 = data;
        console.log("response2", response2);
        email = response2.email;
        // what does error message look like?
      } catch {
        return formatGraphQLYogaError(badGithubOauthRequest);
      }

      if (!email) {
        // github users email is set to private and needs to be called with more specific API endpoint
        try {
          const { data } = await axios("https://api.github.com/user/emails", {
            headers: { Authorization: `Bearer ${response.access_token}` },
          });
          console.log("response3", data);
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
          `Cannot access the email associated with your Github account.
          Please use an alternative sign up method 
          or check the email settings on your github account.`
        );
      }

      // check if user already exists in database
      const userAlreadyExists = await User.findOne({
        where: { email },
      });

      if (userAlreadyExists) {
        console.log(userAlreadyExists);
        // login now succesful
        const { id, confirmed, avatar, password, oAuth } = userAlreadyExists;

        if (password && !oAuth) {
          // user needs to input password before linking to oauth account
        }

        // by this point, user is guaranteed to have confirmed email
        // through oauth sign up or traditional sign up
        // superfluous error check
        if (!confirmed) {
          return formatGraphQLYogaError("Not confirmed");
        }

        // grab avatar from github if user doesn't have one
        if (!avatar && response2.avatar_url) {
          await User.update({ id }, { avatar: response2.avatar_url });
        }

        // login successful
        req.session.userId = id;
        if (req.sessionID) {
          await redis.lpush(`${userSessionIdPrefix}${id}`, req.sessionID);
        }
        return true;
      }

      const { name, avatar_url } = response2;

      if (!name) {
        // firstName is required for all airbnsea users
        //@TODO must redirect user to fill in firstName
        console.log("no name");
        return false;
      }

      // get just first word from name value and make sure its capitalized
      let firstName = name.split(" ")[0];
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

      // @TODO yup validations checks for:
      // email, firstName sent by authorzation server

      // yup validation
      try {
        await registerOAuthUserSchema.validate(
          { email, firstName },
          { abortEarly: false }
        );
      } catch (error) {
        // if firstName error, user redirected to fill in firstName before sign up
        // if email, error, user redirected to default login screen with error explanation
        console.log(error);

        // const errors = formatYupError(error as yup.ValidationError);
        // return errors;
      }

      const user = User.create({
        email,
        firstName,
        avatar: avatar_url,
        confirmed: true,
        oAuth: AuthorizationServer["Github"],
      });

      const { id } = await user.save();

      // oauth registration and login successful
      req.session.userId = id;
      if (req.sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${id}`, req.sessionID);
      }
      return true;
    },
  },
};
