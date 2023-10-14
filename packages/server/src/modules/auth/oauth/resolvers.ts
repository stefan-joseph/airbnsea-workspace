import { v4 as uuidv4 } from "uuid";
import { registerOAuthUserSchema } from "@airbnb-clone/common";
import { ValidationError } from "yup";

import { AuthorizationServer, Resolvers } from "../../../types/types";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { User } from "../../../entity/User";
import { userSessionIdPrefix } from "../../../utils/constants";
import getGithubCredentials from "../../shared/utils/getGithubCredentials";
import getLinkedinCredentials from "../../shared/utils/getLinkedinCredentials";
import formatYupError from "../../shared/utils/formatYupError";

export const formatNoEmailError = (
  authServer: AuthorizationServer
) => `Cannot access the email associated with your ${authServer} account.
Please use an alternative sign up method 
or check the email settings for your ${authServer} account.`;

export const resolvers: Resolvers = {
  Mutation: {
    registerUserWithOauth: async (_, { key, firstName }, { redis, req }) => {
      // extract credentails from redis
      const { email, authServer, avatarImg } = await redis.hgetall(key);

      console.log("response", email, authServer, avatarImg);

      if (!email || !authServer) {
        return formatGraphQLYogaError(
          "There was an issue with the sign up process. Please try again."
        );
      }

      const userAlreadyExists = await User.findOne({
        where: { email },
      });

      if (userAlreadyExists) {
        // user could sign with this email in the 20 minutes between key creation and expiration
        return formatGraphQLYogaError("User already exists.");
      }

      // attempt to register user

      // store first name capitalized by default, user can change in account settings if need be
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

      // yup validation
      try {
        await registerOAuthUserSchema.validate({ email, firstName });
      } catch (error) {
        return {
          __typename: "ValidationError",
          ...formatYupError(error as ValidationError),
        };
      }

      const user = User.create({
        email,
        firstName: firstName.toLowerCase(),
        avatar: avatarImg,
        confirmed: true,
        authorizationServer: authServer,
      });

      const { id } = await user.save();

      // oauth registration and login successful
      req.session.userId = id;
      if (req.sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${id}`, req.sessionID);
      }
      return { __typename: "SuccessResponse", success: true };
    },

    authenticateUserWithOauth: async (
      _,
      { code, authServer },
      { req, redis }
    ) => {
      let credentials;

      if (authServer === AuthorizationServer["Linkedin"]) {
        credentials = await getLinkedinCredentials(code);
      } else if (authServer === AuthorizationServer["Github"]) {
        credentials = await getGithubCredentials(code);
      }

      const email = credentials?.email;

      if (!email) {
        return formatGraphQLYogaError(formatNoEmailError(authServer));
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        // user must go through registration window for oauth first
        // set key for reference to email, auth server and possible avatar

        const key = uuidv4();
        await redis.hmset(key, {
          email,
          authServer,
          avatarImg: credentials?.avatarImg,
        });
        // key expires in 20 minutes
        await redis.expireat(key, Math.floor(Date.now() / 1000 + 60 * 20));
        return {
          __typename: "UserMustRegister",
          key,
          email,
          suggestedFirstName: credentials?.firstName,
        };
      }

      // attempt to log in user in
      const { id, avatar, firstName, password, authorizationServer } = user;

      if (password && !authorizationServer) {
        // if user already has an account with email/password
        // but wants to sign in with oauth
        // need to link oauth to account
        // this could be implemented in 'account settings' after user has already logged in
        // user needs to sign in with password first
        return { __typename: "UserAlreadyExists", email, firstName, avatar };
      }

      if (authorizationServer !== authServer) {
        // user is trying to sign in with wrong auth server
        // redirect to correct authorization server portal
        return {
          __typename: "UserExistsWithOAuth",
          email,
          firstName,
          avatar,
          authorizationServer,
        };
      }

      // don't need to check confirmed=true at this point
      // user either originally signed up with oauth
      // or has added oauth authentication in account settings in already confirmed account

      const avatarImg = credentials?.avatarImg;

      if (!avatar && avatarImg) {
        // update avatar if not on account and provided by authServer
        await User.update({ id }, { avatar: avatarImg });
      }

      // login successful
      req.session.userId = id;
      if (req.sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${id}`, req.sessionID);
      }

      return { __typename: "SuccessResponse", success: true };
    },
  },
};
