import axios from "axios";
// import * as yup from "yup";
import { AuthorizationServer, Resolvers } from "../../../types/types";
import { Endpoints } from "@octokit/types";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import {
  badGithubOauthRequest,
  badLinkedinOauthRequest,
} from "./errorMessages";
import { User } from "../../../entity/User";
import { userSessionIdPrefix } from "../../../utils/constants";
import { registerOAuthUserSchema } from "@airbnb-clone/common";
import { stringify } from "querystring";

export const resolvers: Resolvers = {
  Mutation: {
    authenticateUserWithLinkedin: async (_, { code }, { req, redis }) => {
      let response;
      try {
        const { data } = await axios.post(
          "https://www.linkedin.com/oauth/v2/accessToken",
          stringify({
            grant_type: "authorization_code",
            code,
            client_id: process.env.LINKEDIN_AUTH_CLIENT_ID,
            client_secret: process.env.LINKEDIN_AUTH_CLIENT_SECRET,
            redirect_uri: `${process.env.FRONTEND_HOST}/auth/linkedin`,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        response = data;
      } catch (error) {
        console.log("error", error);
        return formatGraphQLYogaError(badLinkedinOauthRequest);
      }
      console.log("data", response);

      // let email;
      let response2;

      try {
        const { data } = await axios("https://api.linkedin.com/v2/userinfo", {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });

        response2 = data;
        console.log("response2", response2);
      } catch (error) {
        console.log("error2", error);

        return formatGraphQLYogaError(badLinkedinOauthRequest);
      }
      console.log("response2", response2);

      const { email, email_verified, given_name, picture } = response2;

      if (!email || !email_verified) {
        return formatGraphQLYogaError(
          `Cannot access the email associated with your LinkedIn account.
          Please use an alternative sign up method 
          or check the email settings on your LinkedIn account.`
        );
      }

      const userAlreadyExists = await User.findOne({
        where: { email },
      });

      if (userAlreadyExists) {
        const { id, confirmed, avatar, password, oAuth } = userAlreadyExists;

        if (password && !oAuth) {
          // @TODO
          // if user already has an account with email/password
          // but wants to sign in with oauth
          // need to link oauth to account
          // should user input password first?
          // if yes, how to implement this?
        }

        if (!confirmed) {
          // if user has already created an account with email/password
          // but has not confirmed it through email
          // oauth api access infers email is confirmed through authentication server account
          await User.update({ id }, { confirmed: true });
        }

        // grab avatar from linkedin if user doesn't have one
        if (!avatar && picture) {
          await User.update({ id }, { avatar: picture });
        }

        // login successful
        req.session.userId = id;
        if (req.sessionID) {
          await redis.lpush(`${userSessionIdPrefix}${id}`, req.sessionID);
        }
        return true;
      }

      if (!given_name) {
        // @TODO
        // firstName is required for all airbnsea users
        // must redirect user to fill in firstName
        console.log("no name");
        return false;
      }

      // make sure first name is capitalized

      const firstName =
        given_name.charAt(0).toUpperCase() + given_name.slice(1).toLowerCase();

      // yup validation
      try {
        await registerOAuthUserSchema.validate({ email, firstName });
      } catch (error) {
        // @TODO
        // if firstName error, user redirected to fill in firstName before sign up
        // if email, error, user redirected to default login screen with error explanation
        console.log(error);
        return formatGraphQLYogaError("yup validation error");
      }

      const user = User.create({
        email,
        firstName,
        avatar: picture,
        confirmed: true,
        oAuth: AuthorizationServer["Linkedin"],
      });

      const { id } = await user.save();

      // oauth registration and login successful
      req.session.userId = id;
      if (req.sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${id}`, req.sessionID);
      }

      return true;
    },
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
        // login now succesful
        const { id, confirmed, avatar, password, oAuth } = userAlreadyExists;

        if (password && !oAuth) {
          // @TODO
          // if user already has an account with email/password
          // but wants to sign in with oauth
          // need to link oauth to account
          // should user input password first?
          // if yes, how to implement this?
        }

        if (!confirmed) {
          // if user has already created an account with email/password
          // but has not confirmed it through email
          // oauth api access infers email is confirmed through authentication server account
          await User.update({ id }, { confirmed: true });
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
        // @TODO
        // firstName is required for all airbnsea users
        // must redirect user to fill in firstName
        return formatGraphQLYogaError("no name on account");
      }

      // get just first word from name value and make sure its capitalized
      let firstName = name.split(" ")[0];
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

      // yup validation
      try {
        await registerOAuthUserSchema.validate(
          { email, firstName },
          { abortEarly: false }
        );
      } catch (error) {
        // @TODO
        // if firstName error, user redirected to fill in firstName before sign up
        // if email, error, user redirected to default login screen with error explanation
        console.log(error);
        return formatGraphQLYogaError("yup validation error");
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
